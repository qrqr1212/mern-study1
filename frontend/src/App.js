import React, {useState, useEffect} from 'react';
import { NavLink ,Routes, Route } from 'react-router-dom';
import { Menu , Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import './Css/common.css'
import Join from './pages/Join';
import Users from './pages/Users';
import Login from './pages/Login';

function App() {

  // 로그인 유무
  const [ loginState, setLoginState] = useState(false);

  useEffect( () => {
    // localStorage 에 저장되어있는 값 조회
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    console.log(`로그인 유저 아이디 : ${userId}`);

    // 로그인 상태이면 로그인 상태 True
    if(userId) 
      setLoginState(true)
  });

  
  return (
    <div className="App">
      <Container>
        <Menu secondary>
          <Menu.Item as={NavLink} to="/join" name="join"></Menu.Item>
          <Menu.Item as={NavLink} to="/Users" name="Users"></Menu.Item>
          <Menu.Item as={NavLink} to="/login" name="login"></Menu.Item>
          <Menu.Item as={NavLink} to="/logout" name="logout"></Menu.Item>
        </Menu>
        <Routes>
          <Route path="/join" element={<Join />} ></Route>
          <Route path="/Users" element={<Users />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
