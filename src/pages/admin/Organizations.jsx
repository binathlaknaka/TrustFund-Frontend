import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const API_BASE = 'http://localhost:5000/api';

const OrganizationsPage = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);

  const fetchData = async () => {
    try {
      const [pendingRes, approvedRes] = await Promise.all([
        fetch(`${API_BASE}/users?role=charity&approved=false`),
        fetch(`${API_BASE}/users?role=charity&approved=true`)
      ]);

      const pending = await pendingRes.json();
      const approved = await approvedRes.json();

      setPendingUsers(pending);
      setApprovedUsers(approved);
    } catch (error) {
      console.error('Error fetching organizations:', error);
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
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <Helmet><title>Admin | Organizations</title></Helmet>

      {/* New Organizations */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-black">NEW ORGANIZATIONS</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-400 text-left text-sm sm:text-base text-black">
                <th className="p-3 sm:p-4">ORG ID</th>
                <th className="p-3 sm:p-4">ORG NAME</th>
                <th className="p-3 sm:p-4">LEGAL DOC</th>
                <th className="p-3 sm:p-4">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {pendingUsers.length > 0 ? pendingUsers.map((user) => (
                <tr key={user._id} className="text-sm sm:text-base text-black">
                  <td className="p-3 sm:p-4">{user._id}</td>
                  <td className="p-3 sm:p-4">{user.fullName}</td>
                  <td className="p-3 sm:p-4">
<a
  href={`http://localhost:5000/uploads/${user.nicDocument}`}
  download
  className="text-blue-600 hover:underline"
>
  Download
</a>
                  </td>
                  <td className="p-3 sm:p-4 flex gap-2">
                    <button onClick={() => approveUser(user._id)} className="text-green-600 hover:text-green-800">✔️</button>
                    <button onClick={() => rejectUser(user._id)} className="text-red-600 hover:text-red-800">❌</button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="4" className="text-center p-4 text-black">No new organizations.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approved Organizations */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-black">ALL ORGANIZATIONS</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-400 text-left text-sm sm:text-base text-black">
                <th className="p-3 sm:p-4">ORG ID</th>
                <th className="p-3 sm:p-4">ORG NAME</th>
              </tr>
            </thead>
            <tbody>
              {approvedUsers.length > 0 ? approvedUsers.map((user) => (
                <tr key={user._id} className="text-sm sm:text-base text-black">
                  <td className="p-3 sm:p-4">{user._id}</td>
                  <td className="p-3 sm:p-4">{user.fullName || user.email}</td>
                </tr>
              )) : (
                <tr><td colSpan="2" className="text-center p-4 text-black">No organizations found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrganizationsPage;
