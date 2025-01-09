import React, { useState } from "react";
import Navbar from "../../components/Tutor/Navbar";
import Sidebar from "../../components/Tutor/Sidebar";


const TutorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "Experienced educator specializing in mathematics and science. Passionate about making learning accessible and engaging for everyone.",
  });

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Logic to save profile data can go here (e.g., API call)
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex justify-center items-center flex-grow bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl w-full">
            <div className="flex items-center space-x-6">
              {/* Profile Picture */}
              <div className="relative">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border-2 border-teal-500"
                />
                <button
                  className="absolute bottom-2 right-2 bg-teal-500 text-white p-1 rounded-full shadow-md hover:bg-teal-600"
                  title="Change Picture"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.172 7l-6.414 6.414a2 2 0 01-.828.586L6 15l.586-1.93a2 2 0 01.586-.828L13.828 5H21v6.172z"
                    />
                  </svg>
                </button>
              </div>

              {/* Profile Details */}
              <div className="flex-1">
                {!isEditing ? (
                  <>
                    <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
                    <p className="text-gray-600 text-lg">{profile.email}</p>
                    <p className="mt-4 text-gray-700">{profile.bio}</p>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-md mb-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Name"
                    />
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-md mb-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Email"
                    />
                    <textarea
                      name="bio"
                      value={profile.bio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-md mb-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Bio"
                    />
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end space-x-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
