import React, { useState } from 'react';
import { Modal, Form, Select, Spin, Avatar } from 'antd'
import { AppContext } from '../../context/AppProvider'
import { debounce } from 'lodash'
import { db } from '../../firebase/config'

function DebounceSelect({ fetchOPtions, debounceTimeout = 300, ...props}){
    
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOPtions(value, props.curMembers).then(newOptions => {
                setOptions(newOptions);
                setFetching(false);
            })
        }
        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOPtions])

    return (
            <Select
                labelInvalue    
                filterOption={false}
                onSearch={debounceFetcher}
                notFoundContent={ fetching ? <Spin size="small" /> : null}
                {...props}
            >
                {
                    options.map(option => (
                        <Select.Option key={option.value} value={option.value} title={option.label} >
                            <Avatar size="small" src={option.photoURL}>
                                { option.photoURL ? '' : option.label.charAt(0).toUpperCase() } 
                            </Avatar>
                            {`${option.label}`}
                        </Select.Option>
                    ))
                }
            </Select>
    )
}

async function fetUserList (search, curMembers) {
    return db
        .collection('users')
        .where('keywords', 'array-contains', search)
        .orderBy('displayName')
        .limit(20)
        .get()
        .then(snapshot => {
            return snapshot.docs.map(doc => ({
                label: doc.data().displayName,
                value: doc.data().uid,
                photoURL: doc.data().photoURL
            })).filter(opt => !curMembers.includes(opt.value))
        })
}

const InviteMemberModal = () => {

    const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom} = React.useContext(AppContext);
    const [form] = Form.useForm(); //hook này dùng để lấy dữ liệu từ form
    const [value, setValue] = useState([])
    console.log(value);
    const handleOK = () => {
        // update members in current room
        const roomref = db.collection('rooms').doc(selectedRoomId);

        roomref.update({
            members:[
                ...selectedRoom.members,
                ...value.map(val => val)
            ]
        })
        // reset form value
        form.resetFields();
        // setIsAddRoomVisible là false để đóng cửa sổ modal lại
        setIsInviteMemberVisible(false)
    }

    const handleCancel = () => {
        // reset form value
        form.resetFields();
        // setIsAddRoomVisible là false để đóng cửa sổ modal lại
        setIsInviteMemberVisible(false)
    }

    return (
        <Modal 
            title='Mời thêm thành viên'
            visible={isInviteMemberVisible}
            onOk={handleOK}
            onCancel={handleCancel}
        >
            <Form form={form} /*layout='vertical'*/>
                <DebounceSelect
                    mode='multiple'
                    label='Tên các thành viên' 
                    value={value}
                    placeholder='Nhập tên thành viên'
                    fetchOPtions={fetUserList}
                    onChange={newValue => setValue(newValue)}
                    style={{width:`100%`}}
                    curMembers={selectedRoom.members}
                />
            </Form>
        </Modal>
    )
}

export default InviteMemberModal;