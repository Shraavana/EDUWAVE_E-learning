import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../Pages/Adminside/Signin';
import AdminHome from '../Pages/Adminside/Adminhome';
import AdminTutorManagement from '../Pages/Adminside/AdminTutormanagment';
// import AdminUsermanagment from '../Pages/Adminside/AdminUsermanagment';
import AdminProfile from '../Pages/Adminside/AdminProfile';


const Adminsideroutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/home" element={<AdminHome />} />
      <Route path="/tutor-list" element={<AdminTutorManagement/>}/>
      {/* <Route path="/user-list" element={<AdminUsermanagment/>}/> */}
      <Route path="/profile" element={<AdminProfile/>}/>
      
     
/    </Routes>
  );
};

export default Adminsideroutes;