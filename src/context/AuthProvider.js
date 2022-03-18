import React from "react";
import { auth } from '.././firebase/config'
import { useHistory  } from 'react-router-dom'
import { Spin } from 'antd'

const AuthContext = React.createContext()

const AuthProvider = ({children}) => {

    const history  = useHistory();
    const [user, setUser] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    React.useEffect(()=>{
        const unsubscribeb = auth.onAuthStateChanged((user)=>{
            console.log({user});
            if(user){
                const { displayName, email, uid, photoURL } = user
                setUser({displayName, email, uid, photoURL})
                setLoading(false)
                history.push('/');
            }
            else{
                setLoading(false)
                history.push('/login')
            }
            // history.push('/login')
        })

        return ()=>{unsubscribeb()}
    },[history])

    return (
        <AuthContext.Provider value={user}>
            {loading ? <Spin/> : children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
export { AuthContext }