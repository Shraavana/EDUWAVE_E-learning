// src/components/Admin/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin/login'); // Redirect to the Admin Login page
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow">
      <h1 className="text-lg font-bold">  Eduwave Admin Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
