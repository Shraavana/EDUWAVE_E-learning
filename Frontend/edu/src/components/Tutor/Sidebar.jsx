
// src/components/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'add-course', label: 'Add Course', path: '/tutor/add-course' },
    { id: 'add-lesson', label: 'Add Lessons', path: '/tutor/add-lesson' },
    { id: 'profile', label: 'Profile', path: '/tutor/profile' },
    { id: 'revenue', label: 'Revenue', path: '/tutor/revenue' },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4">
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
