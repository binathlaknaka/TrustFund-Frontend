import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const API_BASE = 'http://localhost:5000/api';

const DonorsPage = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);

  const fetchData = async () => {
    try {
      const [pendingRes, approvedRes] = await Promise.all([
        fetch(`${API_BASE}/users?role=donor&approved=false`),
        fetch(`${API_BASE}/users?role=donor&approved=true`)
      ]);

      const pending = await pendingRes.json();
      const approved = await approvedRes.json();

      setPendingUsers(pending);
      setApprovedUsers(approved);
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const approveUser = async (id) => {
    await fetch(`${API_BASE}/users/${id}/approve`, { method: 'PUT' });
    fetchData();
  };

  const rejectUser = async (id) => {
    await fetch(`${API_BASE}/users/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-black">
      <Helmet><title>Admin | Donors</title></Helmet>

      {/* New Donors */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-[#3276A6]">🆕 New Donors</h2>
        <div className="rounded-lg shadow bg-white overflow-x-auto">
          <table className="w-full text-sm sm:text-base">
            <thead className="bg-[#3276A6] text-white">
              <tr>
                <th className="p-4 text-left">Donor ID</th>
                <th className="p-4 text-left">Donor Name</th>
                <th className="p-4 text-left">Legal Doc</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingUsers.length > 0 ? (
                pendingUsers.map((user) => (
                  <tr key={user._id} className="even:bg-gray-100">
                    <td className="p-4 break-words">{user._id}</td>
                    <td className="p-4">{user.fullName}</td>
                    <td className="p-4">
                      <a
                        href={`http://localhost:5000/uploads/${user.nicDocument}`}
                        download
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Download
                      </a>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => approveUser(user._id)}
                          className="bg-green-500 hover:bg-green-600 text-white rounded px-3 py-1 text-sm"
                          title="Approve"
                        >
                          ✔️ Approve
                        </button>
                        <button
                          onClick={() => rejectUser(user._id)}
                          className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1 text-sm"
                          title="Reject"
                        >
                          ❌ Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-500">No new donors.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approved Donors */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-[#3276A6]">✅ Approved Donors</h2>
        <div className="rounded-lg shadow bg-white overflow-x-auto">
          <table className="w-full text-sm sm:text-base">
            <thead className="bg-[#3276A6] text-white">
              <tr>
                <th className="p-4 text-left">Donor ID</th>
                <th className="p-4 text-left">Donor Name</th>
              </tr>
            </thead>
            <tbody>
              {approvedUsers.length > 0 ? (
                approvedUsers.map((user) => (
                  <tr key={user._id} className="even:bg-gray-100">
                    <td className="p-4 break-words">{user._id}</td>
                    <td className="p-4">{user.fullName || user.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center p-6 text-gray-500">No approved donors.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DonorsPage;
