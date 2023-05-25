import React from 'react';
import { Menu , Container } from 'semantic-ui-react';

import { NavLink ,Routes, Route } from 'react-router-dom';
import Join from './pages/Join';
import Input2 from './pages/Input2';
import List from './pages/List';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Container>
        <Menu secondary>
          <Menu.Item as={NavLink} to="/join" name="join"></Menu.Item>
          <Menu.Item as={NavLink} to="/input2" name="input2"></Menu.Item>
          <Menu.Item as={NavLink} to="/list" name="list"></Menu.Item>
          <Menu.Item as={NavLink} to="/login" name="login"></Menu.Item>
        </Menu>
        <Routes>
          <Route path="/join" element={<Join />} ></Route>
          <Route path="/input2" element={<Input2 />}></Route>
          <Route path="/list" element={<List />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
