import react from 'react';
import { FacebookAuthProvider } from "firebase/auth";
import { Row, Col, Button, Typography } from 'antd'
import { auth, db} from '../../firebase/config'
import { addDocument, generateKeywords } from '../../firebase/services'

const { Title } = Typography
const fbprovider = new FacebookAuthProvider();

function Login() {

    const handleLogin = async () => {
        const {additionalUserInfo, user} = await auth.signInWithPopup(fbprovider)
        // kiểm tra additionalUserInfo có phải là new user hay không
        if(additionalUserInfo?.isNewUser){
            // db.collection('users').add({
            //     displayName: user.displayName,
            //     email: user.email,
            //     photoURL: user.photoURL,
            //     uid: user.uid,
            //     providerId: additionalUserInfo.providerId
            // })
            addDocument('users',{
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName)
            })
        }
    }

    return(
        <div>
            <Row justify="center" style={{height:800}}>
                <Col span={8}>
                    <Title style={{textAlign: 'center'}} level={3}>Fun chat</Title>
                    <Button style={{width:'100%'}} onClick={handleLogin}>
                        Đăng nhập bằng facebook
                    </Button>
                    <Button style={{width:'100%', marginTop:10}}>
                        Đăng nhập bằng google
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default Login