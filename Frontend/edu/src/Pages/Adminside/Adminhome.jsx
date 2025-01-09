import React from 'react';
import Navbar from '../../components/Admin/Navbar';
import Sidebar from '../../components/Admin/Sidebar';

const AdminHome = () => {
    
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Navbar />
        <div className="p-8">
          <h1 className="text-3xl font-bold">Welcome, Admin!</h1>
          <p className="mt-4 text-gray-700">
            Manage users, tutors, and courses from this dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
