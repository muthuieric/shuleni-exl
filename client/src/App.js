import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/HomePage/Home';
import Chat from './components/ChatPage/Chat';
import Users from './components/UsersPage/Users';
import AddUsers from './components/UsersPage/AddUsers';
import EditUsers from './components/UsersPage/EditUsers';

function App() {
  return (
    <Router>
    <div className='font-sans'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />

        <Route path="/users" element={<Users />} />
          <Route path='/add-users' element={<AddUsers />} />
          <Route path='/users/:id' element={<EditUsers />} />

  
      </Routes>
    </div>
  </Router>

  );
}

export default App;
