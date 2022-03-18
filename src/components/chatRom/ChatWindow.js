import React, { useState } from 'react';
import { Avatar, Button, Form, Tooltip, Input, Alert } from 'antd'
import styled from 'styled-components'
import { UserAddOutlined } from '@ant-design/icons'
import Messages from './Message'
import { AppContext } from '../../context/AppProvider'
import { AuthContext } from '../../context/AuthProvider'
import { addDocument } from '../../firebase/services'
import useFirestore from '../../Hooks/useFirestore';
import { formatRelative } from 'date-fns/esm'

const HeaderStyled = styled.div`
        display: flex;
        justify-content:space-between;
        height:56px;
        padding: 0 16px;
        align-items:center;
        border-bottom: 1px solid #ccc;

        .header{
            &_title{
                font-size: 16px;
                font-weight: 700;
                margin-bottom:5px
            }
            &_description{
                font-weight: 400
            }
        }
    `

    const ButtonGroupStyled = styled.div`
        display: flex;
        align-items:center;
    `
    
    const WrapStyled = styled.div`
        height: 100%;
    `

    const ContentStyled = styled.div`
        height: calc(100% - 56px);
        padding: 11px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    `

    const FormStyled = styled(Form)`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2px 2px 2px 0;
        border: 1px solid #ccc;
        border-radius: 2px;

        .ant-form-item{
            flex:1;
            margin-bottom:0;
        }
    `

    const MessageListStyled = styled.div`
        max-height: 100%;
        overflow-y: auto;
    `

const ChatWindow = () => {

    // const {rooms, selectedRoomId} = React.useContext(AppContext);
    // tìm kiếm room trong list rooms có id = selectedRoomId và callback sẽ đc gọi khi dependencies rooms và selectedRoomId thay đổi,
    // và giá trị bên tỏng callback cũng đc thay đổi để phù hợp với room hiện tại
    // const selectedRoom = React.useMemo(() => rooms.find(room => room.id === selectedRoomId ),[rooms,selectedRoomId])
    // chuyển sang AppProvider để tiện sử dụng

    const { selectedRoom, members, setIsInviteMemberVisible } = React.useContext(AppContext);
    const [inputValue, setInputValue] = useState('')
    const { displayName, photoURL, uid, createdAt } = React.useContext(AuthContext)
    const [form] = Form.useForm()

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleOnSubmit = () => {
        addDocument('messages', {
            inputValue,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName
        })
        form.resetFields(['messages'])
    }

    const conditionMessage = React.useMemo(() => ({
        fielName: 'roomId',
        operator: '==',
        compareValue: selectedRoom.id
    }),[selectedRoom.id])

    const messages = useFirestore('messages',conditionMessage)

    function formatDate(seconds) {
        let formatDate ='';

        if(seconds){
            formatDate = formatRelative(new Date(seconds * 1000),new Date())

            formatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1)
        }
        return formatDate
    }

    return(<WrapStyled>
        {
            selectedRoom.id ? 
            <>
                <HeaderStyled>
            <div className="header_info"> 
                <p className="header_title">{selectedRoom.name}</p>
                <span className="header_description">{selectedRoom.description}</span>
            </div>
            <ButtonGroupStyled>
                <Button type='text' icon={<UserAddOutlined />} onClick={() => setIsInviteMemberVisible(true)}>mời</Button>
                <Avatar.Group size='small' maxCount={2}>
                    {members.map(member => (
                        <Tooltip title={member.displayName} key={member.id}>
                            <Avatar src={member.photoURL}>{member.photoURL ? '' : member.displayName.charAt(0).toUpperCase()}</Avatar>
                        </Tooltip>
                    ))}
                </Avatar.Group>
            </ButtonGroupStyled>
        </HeaderStyled>

        <ContentStyled> 
            <MessageListStyled>
                {messages.map(mes => (
                    <Messages key={mes.id} text={mes.inputValue} displayName={mes.displayName} photoURL={mes.photoURL} createdAt={formatDate(mes.createdAt)} />
                ))}
            </MessageListStyled>
            <FormStyled form={form}>
                <Form.Item name='messages'>
                    <Input 
                        onChange={handleInputChange}
                        onPressEnter={handleOnSubmit}
                        bordered={false}  
                        autoComplete='off'
                        placeholder='nhập tin nhắn'
                    />
                </Form.Item>
                <Button onClick={handleOnSubmit}>Gửi</Button>
            </FormStyled>
        </ContentStyled>
            </> : <Alert message="hãy chọn phòng" type='info' showIcon style={{margin:5}} closable />
        }
        
    </WrapStyled>)
}

export default ChatWindow