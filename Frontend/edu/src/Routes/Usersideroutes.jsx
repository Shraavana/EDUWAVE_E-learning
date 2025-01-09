import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../Pages/Userside/Signin';
import SignUp from '../Pages/Userside/Signup';
import Home from '../Pages/Userside/Home';
import OTPPage from '../Pages/Userside/Otp';
import {Provider} from 'react-redux';
import { store } from '../redux/store/store';

const Usersideroutes = () => {
  return (
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/otp" element={<OTPPage/>} />
      <Route path="*" element={<div>Page not found</div>} />
     </Routes>
  );
};

export default Usersideroutes;
