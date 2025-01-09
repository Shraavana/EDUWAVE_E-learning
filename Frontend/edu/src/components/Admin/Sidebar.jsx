// src/components/Admin/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/admin/home' },
    { id: 'profile', label: 'Profile', path: '/admin/profile' },
    { id: 'users-list', label: 'Users List', path: '/admin/user-list' },
    { id: 'tutors-list', label: 'Tutors List', path: '/admin/tutor-list' },
    { id: 'courses', label: 'Courses', path: '#' },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 h-screen p-4">
      <ul className="space-y-4">
        {menuItems.map(({ id, label, path }) => (
          <li
            key={id}
            className="hover:bg-gray-700 p-2 rounded cursor-pointer"
            onClick={() => navigate(path)}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
