import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminDashboardImage from '../../assets/admin-dashboard.png';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    newUsers: 0,
    totalOrganizations: 0,
    totalUsers: 0,
    totalDonations: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mx-auto px-4 text-black flex justify-center items-center min-h-[calc(100vh-8rem)]">
      <Helmet>
        <title>Admin | Dashboard</title>
      </Helmet>

      <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl mx-auto">
        {/* Left Section: Stats */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="bg-[#D9D9D9] rounded-md p-6 flex justify-between items-center">
            <h3 className="text-lg font-medium">New Users</h3>
            <p className="text-xl font-bold">{stats.newUsers}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#D9D9D9] rounded-md p-6">
              <h3 className="text-lg font-medium text-center mb-3">Total Organizations</h3>
              <p className="text-5xl font-bold text-center text-blue-500">{stats.totalOrganizations}</p>
            </div>

            <div className="bg-[#D9D9D9] rounded-md p-6">
              <h3 className="text-lg font-medium text-center mb-3">Total Users</h3>
              <p className="text-5xl font-bold text-center text-blue-500">{stats.totalUsers}</p>
            </div>
          </div>

          <div className="bg-[#D9D9D9] rounded-md p-6">
            <h3 className="text-lg font-medium text-center mb-3">Total Donations</h3>
            <p className="text-4xl font-bold text-center">
              <span className="text-black">$ </span>
              <span className="text-blue-500">{stats.totalDonations.toLocaleString()}</span>
            </p>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="w-full md:w-1/3 flex items-center justify-center">
          <img
            src={AdminDashboardImage}
            alt="Admin dashboard illustration"
            className="w-full max-w-md h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
