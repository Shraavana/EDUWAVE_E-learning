import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProfile } from "../../redux/store/actions/adminActions";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { data: profile, loading, error } = useSelector((state) => state.admin.profile);

  useEffect(() => {
    dispatch(fetchAdminProfile());
  }, [dispatch]);

  if (loading) return <p className="text-center text-gray-600 mt-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;
  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        Admin Profile
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p className="text-gray-700">
          <span className="font-medium">Username:</span> {profile.username}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Email:</span> {profile.email}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">First Name:</span> {profile.first_name || "N/A"}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Last Name:</span> {profile.last_name || "N/A"}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Superuser:</span> {profile.is_superuser ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
};

export default AdminProfile;