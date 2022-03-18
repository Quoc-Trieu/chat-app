import React from 'react';
import { Avatar, Typography } from 'antd'
import styled from 'styled-components'

const Message = ({ text, displayName, createdAt, photoURL }) => {

    const WrapperMessage = styled.div`
        margin-bottom:10px;

        .author{
            margin-left:5px;
            font-weight:bold;
        }

        .date{
            margin-left:5px;
            font-size:11px;
            color: #a7a7a7;
        }

        .content{
            marin-left:30px;
        }
    `

    return (
        <WrapperMessage>
            <div>
                <Avatar src={photoURL}>A</Avatar>
                <Typography.Text className="author">{displayName}</Typography.Text>
                <Typography.Text className="date">{createdAt}</Typography.Text>
            </div>
            <div>
                <Typography.Text className="content">{text}</Typography.Text>
            </div>
        </WrapperMessage>
    )
}

export default Message