import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/HomePage/Home';
import Chat from './components/ChatPage/Chat';
import Users from './components/UsersPage/Users';
import AddUsers from './components/UsersPage/AddUsers';
import EditUsers from './components/UsersPage/EditUsers';
import Schools from './components/SchoolPage/School';
import AddSchool from './components/SchoolPage/AddSchool';
import EditSchools from './components/SchoolPage/EditSchool';

function App() {
  return (
    <Router>
    <div className='font-sans'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />

        <Route path="/schools" element={<Schools />} />
        <Route path='/add-school' element={<AddSchool />} />
        <Route path='/schools/:id' element={<EditSchools/>} />

        <Route path="/users" element={<Users />} />
        <Route path='/add-users' element={<AddUsers />} />
        <Route path='/users/:id' element={<EditUsers />} />

  
      </Routes>
    </div>
  </Router>

  );
}

export default App;
