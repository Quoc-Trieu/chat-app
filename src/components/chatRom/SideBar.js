import React from 'react';
import { Row, Col } from 'antd'
import UserInfo from './UserInfo'
import ListRoom from './ListRoom'
import styled from 'styled-components'

const SideBar = () => {

    const SidebarStyled = styled.div`
        background: #3c0d3d;
        color: #fff;
        height: 100vh;
    `

    return(
        <SidebarStyled>
            <Row>
                <Col span={24}><UserInfo/></Col>
                <Col span={24}><ListRoom/></Col>
            </Row>
        </SidebarStyled>
    )
}

export default SideBar