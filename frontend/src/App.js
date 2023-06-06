import React, {useState, useEffect} from 'react';
import { NavLink ,Routes, Route } from 'react-router-dom';
import { Menu , Container } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';

import Join from './pages/Join';
import Users from './pages/Users';
import Board from './pages/Board/BoardList';
import Login from './pages/Login';
import NewBoard from './pages/Board/NewBoard';
import About from './pages/About';

import "react-toastify/dist/ReactToastify.css";
import 'semantic-ui-css/semantic.min.css'
import './Css/common.css'

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

      <ToastContainer
        position="top-center"
        limit={1}
        closeButton={false}
        autoClose={3000}
        hideProgressBar
      />

      <Container>
        <Menu secondary>
          <Menu.Item as={NavLink} to="/join" name="join"></Menu.Item>
          <Menu.Item as={NavLink} to="/Users" name="Users"></Menu.Item>
          <Menu.Item as={NavLink} to="/Board" name="Board"></Menu.Item>
          <Menu.Item as={NavLink} to="/login" name="login"></Menu.Item>
          <Menu.Item as={NavLink} to="/logout" name="logout"></Menu.Item>
          <Menu.Item as={NavLink} to="/About" name="About"></Menu.Item>

        </Menu>
        <Routes>
          <Route path="/join" element={<Join />} ></Route>
          <Route path="/Users" element={<Users />}></Route>
          <Route path="/Board" element={<Board />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/NewBoard" element={<NewBoard />}></Route>
          <Route path="/About" element={<About />}></Route>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
