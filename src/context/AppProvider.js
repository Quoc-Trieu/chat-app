import React from "react";
import useFirestore from '../Hooks/useFirestore'
import { AuthContext } from './AuthProvider'

const AppContext = React.createContext() //tạo context

const AppProvider = ({children}) => {

    const [isAddRoomVisible, setIsAddRoomVisible] = React.useState(false)
    const [isInviteMemberVisible, setIsInviteMemberVisible] = React.useState(false)
    const [selectedRoomId, setSelectedRoomId] = React.useState('')
    const { uid } = React.useContext(AuthContext)   
    const roomsCondition = React.useMemo(()=>{
        return {
            fielName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }
    },[uid])
    // kiểm tra trong fielname rooms xem room nào có chứa member là uid hiện thì trả về
    const rooms = useFirestore('rooms',roomsCondition) 
    console.log(rooms);
    // tìm kiếm room trong list rooms có id = selectedRoomId và callback sẽ đc gọi khi dependencies rooms và selectedRoomId thay đổi,
    // và giá trị bên tỏng callback cũng đc thay đổi để phù hợp với room hiện tại
    const selectedRoom = React.useMemo(
        () => rooms.find(room => room.id === selectedRoomId ) || {},
        [rooms,selectedRoomId]
    );

    const uersCondition = React.useMemo(()=>{
        return {
            fielName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members
        }
    },[selectedRoom.members])
    // lấy ra những user có uid nằm trong aray members của room hiện tại 
    const members = useFirestore('users',uersCondition) 

    return (
        <AppContext.Provider value={{
            rooms, 
            members,
            isAddRoomVisible,
            setIsAddRoomVisible, 
            selectedRoomId, 
            setSelectedRoomId,
            isInviteMemberVisible, 
            setIsInviteMemberVisible,
            selectedRoom,
            }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
export { AppContext }
