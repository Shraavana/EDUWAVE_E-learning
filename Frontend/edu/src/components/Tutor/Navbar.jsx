// src/components/Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-emerald-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Eduwave</div>
        <div>
          <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
