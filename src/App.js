import { Route, Switch, BrowserRouter} from 'react-router-dom'
import './App.css';
import Login from './components/login';
import ChatRom from './components/chatRom';
import AuthProvider from './context/AuthProvider'
import AppProvider from './context/AppProvider'
import AddRoomModal from './components/Modals/AddRoomMoal';
import InviteMemberModal from './components/Modals/InviteMemberModal';

function App() {
  return (
          <BrowserRouter>
            <AuthProvider>
              <AppProvider>
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/" component={ChatRom} />
                </Switch>
                  <AddRoomModal />
                  <InviteMemberModal />
              </AppProvider>
            </AuthProvider>
          </BrowserRouter>
  )
}

export default App;
