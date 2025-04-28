import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CharityImage from '../../assets/charity.png';

const AdminProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <Helmet>
            <title>Admin | Profile</title>
        </Helmet>
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-black mb-6 flex justify-center sm:text-left">
        Admin Profile
      </h1>

      {/* Profile Section */}
      <div className="rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
        {/* Profile Picture Section */}
        <div className="w-full sm:w-1/3 flex flex-col items-center">
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white flex items-center justify-center rounded-lg mb-4">
            <img src={CharityImage} alt="profile image"/>
          </div>
          <p className="text-black font-semibold mb-2">Admin Picture</p>
          <button className="bg-[#3276A6] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#2b658f]">
            Edit
          </button>
        </div>

        {/* Form Inputs */}
        <div className="w-full sm:w-2/3 flex flex-col gap-4">
          <div>
            <label className="block text-sm sm:text-base font-medium text-black mb-2">
              Admin Email
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium text-black mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium text-black mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium text-black mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
            />
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleLogout}
          className="bg-[#3276A6] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#2b658f]"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminProfilePage;