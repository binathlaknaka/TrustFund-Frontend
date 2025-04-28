import React from 'react';
import { Helmet } from 'react-helmet-async';

const DonorsPage = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <Helmet>
            <title>Admin | Donors</title>
        </Helmet>
      {/* New Users Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-black">NEW USERS</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-400 text-left text-sm sm:text-base text-black">
                <th className="p-3 sm:p-4">DONOR ID</th>
                <th className="p-3 sm:p-4">DONOR NAME</th>
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
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </button>
                </td>
                <td className="p-3 sm:p-4">
                  <button className="text-red-600 hover:text-red-800">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </td>
              </tr>
              {/* Placeholder rows for visual consistency */}
              {[...Array(2)].map((_, index) => (
                <tr key={index} className="text-sm sm:text-base text-black">
                  <td className="p-3 sm:p-4">-</td>
                  <td className="p-3 sm:p-4">-</td>
                  <td className="p-3 sm:p-4">-</td>
                  <td className="p-3 sm:p-4">-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* All Users Section */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-black">ALL USERS</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-400 text-left text-sm sm:text-base text-black">
                <th className="p-3 sm:p-4">DONOR ID</th>
                <th className="p-3 sm:p-4">DONOR NAME</th>
                <th className="p-3 sm:p-4">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {/* Placeholder rows for visual consistency */}
              {[...Array(4)].map((_, index) => (
                <tr key={index} className="text-sm sm:text-base text-black">
                  <td className="p-3 sm:p-4">-</td>
                  <td className="p-3 sm:p-4">-</td>
                  <td className="p-3 sm:p-4">-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DonorsPage;