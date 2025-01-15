import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../../components/Admin/Sidebar"; 


const AdminUsermanagment = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/admin/users/`);
      setUsers(response.data.users);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUser = async (userId, currentStatus) => {
    const action = currentStatus ? 'block' : 'unblock';
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}/block/`, { action });
      fetchUsers();
    } catch (err) {
      console.error('Failed to update user status:', err);
      setError('Failed to update user status.');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex flex-col flex-grow bg-gray-100">
        
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Users Management</h1>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No users found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow rounded">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-4">ID</th>
                    <th className="text-left p-4">Username</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Role</th>
                    <th className="text-left p-4">Joined Date</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{user.id}</td>
                      <td className="p-4">{user.username}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            user.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {user.is_active ? 'Active' : 'Blocked'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            user.is_tutor
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {user.is_tutor ? 'Tutor' : 'Student'}
                        </span>
                      </td>
                      <td className="p-4">
                        {new Date(user.date_joined).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleBlockUser(user.id, user.is_active)}
                          className={`px-3 py-1 rounded ${
                            user.is_active
                              ? 'bg-red-500 hover:bg-red-600 text-white'
                              : 'bg-green-500 hover:bg-green-600 text-white'
                          }`}
                        >
                          {user.is_active ? 'Block' : 'Unblock'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsermanagment;
