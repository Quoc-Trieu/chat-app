import React from 'react';
import { Button, Avatar, Typography } from 'antd'
import styled from 'styled-components'
import { auth, db } from '../../firebase/config'
import { AuthContext } from '../../context/AuthProvider'

const Wrapper = styled.div`
        display: flex;
        justify-content: space-between;
        padding: 12px 16px;
        border-bottom: 1px solid #ccc;
        height: 56px;

        .user_name{
            color: #fff;
            margin-left: 10px;
        }
    `

const UserInfo = () => {

    const { displayName, photoURL } = React.useContext(AuthContext)

    return(
        <Wrapper> 
            <div>
                <Avatar src={photoURL}>{photoURL ? '' : displayName && displayName.charAt(0).toUpperCase()}</Avatar>
                <Typography.Text className="user_name">{displayName}</Typography.Text>
            </div>
            <Button 
                ghost
                onClick={ () => auth.signOut()}
            >
                Đăng xuất
            </Button>
        </Wrapper>
    )
}

export default UserInfo