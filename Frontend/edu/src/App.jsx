import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Usersideroutes from './Routes/Usersideroutes';
import Tutorsideroutes from './Routes/Tutorsideroutes';
import Adminsideroutes from './Routes/Adminsideroutes';


const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/*" element={<Usersideroutes />} />
          <Route path="/tutor/*" element={<Tutorsideroutes />} />
          <Route path="/admin/*" element={<Adminsideroutes />} />
        </Routes>
      </Router>
   
  );
};

export default App;