import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminProfile = () => {

  const [profile, setProfile] = useState({})

  const adminFetchProfile = async () => {
    const accessToken = localStorage.getItem('adminToken');
    try{
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/admin/profile/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      setProfile(response.data);
    }catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    adminFetchProfile();
  }, []);


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        Admin Profile
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p className="text-gray-700">
          <span className="font-medium">Username: {profile.username}</span> 
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Email: {profile.email}</span> 
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Superuser: {profile.is_superuser ? 'True' : 'False'}</span> 
        </p>
      </div>
    </div>
  );
};

export default AdminProfile;