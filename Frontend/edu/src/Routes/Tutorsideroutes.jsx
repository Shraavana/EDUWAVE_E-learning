import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TutorHome from '../Pages/Tutorside/TutorHome';
import SignIn from '../Pages/Tutorside/Signin';
import SignUp from '../Pages/Tutorside/Signup';
import TutorProfile from '../Pages/Tutorside/Profile';

const Tutorsideroutes = () => {
  return (
    <Routes>
      <Route path="home" element={<TutorHome />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="profile" element={<TutorProfile />} />
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
};

export default Tutorsideroutes;
