import React from 'react';
import { Helmet } from 'react-helmet-async';


const DonationReceivePage = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <Helmet>
            <title>Organizations | Donations</title>
        </Helmet>
      {/* Page Title */}
      <h2 className="text-xl font-bold mb-4 text-black">DONATION RECEIVE</h2>

      {/* Donations Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-400 text-left text-sm sm:text-base text-black">
              <th className="p-3 sm:p-4">DONOR ID</th>
              <th className="p-3 sm:p-4">DONOR NAME</th>
              <th className="p-3 sm:p-4">DATE</th>
              <th className="p-3 sm:p-4">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder rows for visual consistency */}
            {[...Array(4)].map((_, index) => (
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
  );
};

export default DonationReceivePage;