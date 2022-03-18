import React from 'react';
import { Modal, Form, Input } from 'antd'
import { AppContext } from '../../context/AppProvider'
import styled from 'styled-components'
import { addDocument } from '../../firebase/services'
import { AuthContext } from '../../context/AuthProvider'

const AddRoomModal = () => {

    const { isAddRoomVisible, setIsAddRoomVisible} = React.useContext(AppContext);
    const { uid } = React.useContext(AuthContext);
    const [form] = Form.useForm(); //hook này dùng để lấy dữ liệu từ form

    const handleOK = () => {
        // login
        // add new room to firestore
        console.log({formdata: form.getFieldValue()});
        addDocument('rooms',{
            ...form.getFieldValue(),
            members: [uid]
        })
        // reset form value
        form.resetFields();
        // setIsAddRoomVisible là false để đóng cửa sổ modal lại
        setIsAddRoomVisible(false)
    }

    const handleCancel = () => {
        // reset form value
        form.resetFields();
        // setIsAddRoomVisible là false để đóng cửa sổ modal lại
        setIsAddRoomVisible(false)
    }

    const FormStyle = styled.div`
        &&&{
            .ant-col.ant-form-item-label {
                width: 75px;
                margin-right: 10px;
            }
            label {
                float: left;
            }
        }
    `

    return (
        <Modal 
            title='Tạo phòng'
            visible={isAddRoomVisible}
            onOk={handleOK}
            onCancel={handleCancel}
        >
            <Form form={form} /*layout='vertical'*/>
                <FormStyle>
                    <Form.Item label="Tên phòng" name="name">
                        <Input placeholder="name" />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea placeholder="description" />
                    </Form.Item>
                </FormStyle>
            </Form>
        </Modal>
    )
}

export default AddRoomModal;