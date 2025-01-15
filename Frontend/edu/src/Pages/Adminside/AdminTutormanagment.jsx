import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Admin/Sidebar';
import axios from '../../utils/adminAxios';

const AdminTutorManagement = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTutors = async () => {
    try {
      const response = await axios.get(`/api/admin/tutors/`);
      setTutors(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch tutors');
    } finally {
      setLoading(false);
    }
  };

  const handleApprovalToggle = async (tutorId) => {
    try {
      const response = await axios.patch(
        `/api/admin/tutors/${tutorId}/status/`,
        { status: 'approved' }
      );
      alert(response.data.message); 
      fetchTutors(); 
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update status');
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex min-h-screen">
      <div className="bg-gray-800 text-white p-4 flex-grow-0">
        <Sidebar />
      </div>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Tutor Management</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Experience</th>
                <th className="px-4 py-2">Degree</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutors.map((tutor) => (
                <tr key={tutor.id}>
                  <td className="border px-4 py-2">{tutor.username}</td>
                  <td className="border px-4 py-2">{tutor.email}</td>
                  <td className="border px-4 py-2">{tutor.teaching_experience} years</td>
                  <td className="border px-4 py-2">{tutor.degree}</td>
                  <td className="border px-4 py-2">
                    {tutor.status === 'pending' ? 'Pending' : 'Approved'}
                  </td>
                  <td className="border px-4 py-2">
                    {tutor.status === 'pending' && (
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={() => handleApprovalToggle(tutor.id)}
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTutorManagement;
