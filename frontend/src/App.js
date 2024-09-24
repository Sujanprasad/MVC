import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom";
import HelloWorld from './components/HELLO';
import UserForm from './components/Students.js';
import Registration from './components/Register';
import RegistrationForm from './components/UserRegistration.js'
import UserLogin from './components/UserLogin.js'; 
import Loginpage from './components/Loginpage.js';
import Dashboard from './components/dashboard.js';
import AdminLoginPage from './components/AdminLoginUser.js';
import UserRegistrationForm from './Product_Task.js/UserRegistration.js';
import UsersLoginpage from './Product_Task.js/Loginpage.js';
import VerifyOTP from './Product_Task.js/VerifyOTP.js';
import Admin from './Product_Task.js/Admindashboard.js';
import User from './Product_Task.js/Userdashboard.js';
import AdminRegistrationForm from './Product_Task.js/AdminRegistration.js';
import IMG from './components/IMG.jsx';
import ImageGallery from './components/DisplayIMG.jsx';
import RegisterUser from './Approval/registerUser.jsx';
import User_Login from './Approval/UserLogin.jsx';
import Admin_Login from './Approval/AdminLogin.jsx';
import Admindashboard from './Approval/Dashboard_Admin.jsx';
import Userdashboard from './Approval/Dashboard_User.jsx';
import Usersapp from './Approval/UsersApproval.jsx';


function App() {
  return (
    <>
      {/* <HelloWorld/> */}
      {/* <UserForm/> */}
      {/* <Registration/> */}
      <Router>
        <Routes>
          <Route path='/' element={<RegisterUser/>}/>
          <Route path="/user-login" element={<User_Login />} />
          <Route path="/admin-login" element={<Admin_Login />} />
          <Route path='/user-dashboard' element={<Userdashboard/>}/>
          <Route path='/admin-dashboard' element={<Admindashboard/>}/>
          <Route path='/user-approval' element={<Usersapp/>}/>
          {/* <Route path="/verify" element={<VerifyOTP />} />
          <Route path="/user_dashboard" element={<User />} />
          <Route path="/admin_dashboard" element={<Admin />} /> */}
        </Routes>
      </Router>

      {/* <IMG/> */}
      {/* <ImageGallery/> */}
      {/* <AdminLoginPage/> */}
      {/* <Loginpage/> */}
      {/* <UserRegistrationForm/> */}
      {/* <UsersLoginpage/> */}
      {/* <VerifyOTP/> */}
      {/* <Admin/> */}
      {/* <User/> */}
      {/* <RegisterUser/> */}
      {/* <User_Login/> */}
      {/* <Admin_Login/> */}
      {/* <Admindashboard/> */}
    </>
  );
}

export default App;

// import React, { useState } from 'react';
// import TodoList from './components/TodoList';
// import TodoForm from './components/TodoForm';
// import DataBase from './components/Database';

// const App = () => {
//     const [editingTodo, setEditingTodo] = useState(null);

//     const handleSave = () => {
//         setEditingTodo(null);
//     };

//     return (
//         <div>
//             <h1>Todo List</h1>
//             <TodoForm todoToEdit={editingTodo} onSave={handleSave} />
//             <TodoList onEdit={setEditingTodo} />
//         </div>
//     <DataBase/>

//     );
// };

// export default App;