import React from 'react';
import AdminDashboardImage from '../../assets/admin-dashboard.png';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 text-black flex justify-center items-center min-h-[calc(100vh-8rem)]">
      {/* Main Dashboard Container */}
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl mx-auto">
        {/* Left Section: Statistics */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* New Users Card */}
          <div className="bg-[#D9D9D9] rounded-md p-6 flex justify-between items-center">
            <h3 className="text-lg font-medium">New Users</h3>
            <p className="text-xl font-bold">12</p>
          </div>

          {/* Cards Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Total Organizations Card */}
            <div className="bg-[#D9D9D9] rounded-md p-6">
              <h3 className="text-lg font-medium text-center mb-3">Total Organizations</h3>
              <p className="text-5xl font-bold text-center text-blue-500">20</p>
            </div>

            {/* Total Users Card */}
            <div className="bg-[#D9D9D9] rounded-md p-6">
              <h3 className="text-lg font-medium text-center mb-3">Total Users</h3>
              <p className="text-5xl font-bold text-center text-blue-500">20</p>
            </div>
          </div>

          {/* Total Donations Card */}
          <div className="bg-[#D9D9D9] rounded-md p-6">
            <h3 className="text-lg font-medium text-center mb-3">Total Donations</h3>
            <p className="text-4xl font-bold text-center">
              <span className="text-black">Rs.</span>
              <span className="text-blue-500">150000</span>
            </p>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="w-full md:w-1/3 flex items-center justify-center">
          <img
            src={AdminDashboardImage}
            alt="Computer with cactus"
            className="w-full max-w-md h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;