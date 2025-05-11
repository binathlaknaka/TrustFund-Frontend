import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const API_URL = 'http://localhost:5000/api/users?role=charity'; // backend route

const OrganizationsPage = () => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setOrganizations(data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <Helmet>
        <title>Admin | Organizations</title>
      </Helmet>

      {/* New Organizations Section (static) */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-black">NEW ORGANIZATIONS</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-400 text-left text-sm sm:text-base text-black">
                <th className="p-3 sm:p-4">ORGANIZATION ID</th>
                <th className="p-3 sm:p-4">ORGANIZATION NAME</th>
                <th className="p-3 sm:p-4">LEGAL DOC</th>
                <th className="p-3 sm:p-4">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-sm sm:text-base text-black">
                <td className="p-3 sm:p-4">-</td>
                <td className="p-3 sm:p-4">-</td>
                <td className="p-3 sm:p-4">
                  <button className="text-blue-600 hover:text-blue-800">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </td>
                <td className="p-3 sm:p-4">
                  <button className="text-red-600 hover:text-red-800">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* All Organizations Section (dynamic) */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-black">ALL ORGANIZATIONS</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-400 text-left text-sm sm:text-base text-black">
                <th className="p-3 sm:p-4">ORGANIZATION ID</th>
                <th className="p-3 sm:p-4">ORGANIZATION NAME</th>
              </tr>
            </thead>
            <tbody>
              {organizations.length > 0 ? (
                organizations.map((org) => (
                  <tr key={org._id} className="text-sm sm:text-base text-black">
                    <td className="p-3 sm:p-4">{org._id}</td>
                    <td className="p-3 sm:p-4">{org.fullName || org.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center p-4 text-black">
                    No organizations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrganizationsPage;
