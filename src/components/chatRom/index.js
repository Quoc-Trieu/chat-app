import react from 'react'
import { Row, Col } from 'antd'
import ChatWindow from './ChatWindow'
import SideBar from './SideBar'

const ChatRom = () => {
    return (
        <Row>
            <Col span={6}><SideBar/></Col>
            <Col span={18}><ChatWindow/></Col>
        </Row>
    )
}

export default ChatRom