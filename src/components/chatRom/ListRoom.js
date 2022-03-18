import React from 'react';
import { Collapse, Typography, Button } from 'antd'
import styled from 'styled-components'
import { PlusSquareOutlined } from '@ant-design/icons'
import { AppContext } from '../../context/AppProvider'

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
     &&&{
         .ant-collapse-header,p{
             color: #fff;
         }
         .ant-collapse-content-box{
             padding: 0 40px
         }
         .add_room{
             color: #fff;
             padding:0;
         }
     }
    `
const TypographyLink = styled(Typography.Link)`
        display: flex;
        flex-direction: column;
        margin-bottom:10px;
    `

const ListRoom = () => {
    // const { uid } = React.useContext(AuthContext)    
    /*
    cấu trúc của 1 document rooms:
    {
        name: 'name rooms',
        decription: 'mô tả',
        members: [uid1,uid2,...]
    }
    */
    //roomsCondition sẽ rerender khi uid thay đổi
    // const roomsCondition = React.useMemo(()=>{
    //     return {
    //         fielName: 'rooms',
    //         operator: 'array-container',
    //         compareValue: uid
    //     }
    // },[uid])

    // const rooms = useFirestore('rooms',roomsCondition) 

    const {rooms, setIsAddRoomVisible, setSelectedRoomId} = React.useContext(AppContext);

    const handleAddRoom = () => {
        setIsAddRoomVisible(true)
    }
    return (
        <Collapse ghost defaultActiveKey={['1']}> 
            <PanelStyled header='Danh sách các phòng' key='1'>
                {rooms.map( room => (
                        <TypographyLink 
                            key={room.id}
                            onClick={()=>setSelectedRoomId(room.id)}
                        >
                            {room.name}
                        </TypographyLink>
                    ))}
                <Button type='text' icon={<PlusSquareOutlined />} className='add_room' onClick={handleAddRoom}>Thêm phòng</Button>
            </PanelStyled>
        </Collapse>
    )
}

export default ListRoom