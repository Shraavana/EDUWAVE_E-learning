import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'lucide-react';
import { fetchUsers, toggleUserBlock } from '../../redux/store/actions/adminActions';
import debounce from 'lodash/debounce';
import Sidebar from '../../components/Admin/Sidebar';

const AdminUsermanagment = () => {
  const dispatch = useDispatch();
  const { list: users, loading, error, totalPages, currentPage } = useSelector(state => state.admin.users);
  const [searchQuery, setSearchQuery] = useState('');

  // Debounced search function
  const debouncedSearch = debounce((query) => {
    dispatch(fetchUsers(1, query));
  }, 300);

  useEffect(() => {
    dispatch(fetchUsers(1));
  }, [dispatch]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleBlockUser = async (userId, currentStatus) => {
    try {
      await dispatch(toggleUserBlock(userId, currentStatus));
    } catch (err) {
      console.error('Failed to update user status:', err);
    }
  };

  const handlePageChange = (page) => {
    dispatch(fetchUsers(page, searchQuery));
  };

  if (loading) {
    return (
      
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {users.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No users found</div>
      ) : (
        <>
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

          <div className="mt-4 flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminUsermanagment;