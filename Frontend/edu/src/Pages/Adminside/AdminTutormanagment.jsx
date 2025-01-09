import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTutors, updateTutorStatus } from '../../redux/store/actions/tutorActions';
import Sidebar from '../../components/Admin/Sidebar';

const AdminTutorManagement = () => {
  const dispatch = useDispatch();
  const { tutors, loading } = useSelector((state) => state.tutor);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [comments, setComments] = useState('');

  useEffect(() => {
    dispatch(fetchTutors());
  }, [dispatch]);

  const handleStatusUpdate = async (tutorId, newStatus) => {
    try {
      await dispatch(updateTutorStatus(tutorId, newStatus, comments));
      setSelectedTutor(null);
      setComments('');
    } catch (error) {
      console.error('Failed to update tutor status:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white p-4 flex-grow-0">
        <Sidebar />
      </div>

      {/* Main Content */}
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
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        tutor.status === 'approved'
                          ? 'bg-green-200 text-green-800'
                          : tutor.status === 'declined'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}
                    >
                      {tutor.status}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    {tutor.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusUpdate(tutor.id, 'approved')}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(tutor.id, 'declined')}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Decline
                        </button>
                      </div>
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
