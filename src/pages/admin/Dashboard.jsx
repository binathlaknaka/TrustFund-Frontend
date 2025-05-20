import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminImage from '../../assets/dashboard.jpg'; // adjust to your image path
import CountUp from 'react-countup';

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
        const res = await fetch('http://localhost:5000/api/users/stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-white text-black px-4">
      <Helmet>
        <title>Admin | Dashboard</title>
      </Helmet>

      <div className="flex flex-col md:flex-row items-center justify-center max-w-7xl w-full gap-2 p-6  bg-white">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          {/* <img
            src={AdminImage}
            alt="Admin Dashboard"
            className="max-w-sm w-full"
          /> */}
                    <h1 className="text-6xl font-bold text-center text-[#3276A6]">ADMIN<br/>Dashboard</h1>

        </div>

        {/* Right: Stats */}
        <div className="w-full md:w-1/2 space-y-6">

          <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white p-6 rounded-xl shadow-lg flex justify-between items-center">
            <h3 className="text-xl font-semibold">New Users</h3>
            <p className="text-3xl font-bold">
              <CountUp end={stats.newUsers} duration={2} />
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow text-center hover:shadow-md transition">
              <h3 className="text-gray-600 font-medium mb-2">Total Organizations</h3>
              <p className="text-blue-600 text-4xl font-bold">
                <CountUp end={stats.totalOrganizations} duration={2} />
              </p>
            </div>

            <div className="bg-white border-l-4 border-green-500 p-4 rounded-lg shadow text-center hover:shadow-md transition">
              <h3 className="text-gray-600 font-medium mb-2">Total Users</h3>
              <p className="text-green-600 text-4xl font-bold">
                <CountUp end={stats.totalUsers} duration={2} />
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Total Donations</h3>
            <p className="text-4xl font-extrabold">
              $ <CountUp end={stats.totalDonations} duration={2} separator="," />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
