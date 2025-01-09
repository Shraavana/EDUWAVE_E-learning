import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Tutor/Navbar';
import Sidebar from '../../components/Tutor/Sidebar';

const TutorHome = () => {

  const sections = [
    {
      id: 'profile',
      title: 'Profile',
      description: 'Update your personal and professional information.',
    
       // Relative path to /tutor/profile
    },
    {
      id: 'add-course',
      title: 'Add Course',
      description: 'Easily create and manage your courses.',
    },
    {
      id: 'revenue',
      title: 'Revenue',
      description: 'Track your earnings and payouts.',
    },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Welcome, Tutor!</h1>
            <p className="mt-4 text-gray-700">Manage your courses and profile here.</p>
          </header>
          <div className="space-y-6">
            {sections.map(({ id, title, description, onClick }) => (
              <div
                key={id}
                id={id}
                className="p-4 bg-white shadow rounded hover:bg-gray-100 transition cursor-pointer"
                onClick={onClick || null}
              >
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorHome;
