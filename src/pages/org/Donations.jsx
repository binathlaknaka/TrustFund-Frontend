import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const DonationReceivePage = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/donations');
        const data = await res.json();
        setDonations(data);
      } catch (err) {
        console.error('Error fetching donations:', err);
      }
    };
    fetchDonations();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <Helmet>
        <title>Organizations | Donations</title>
      </Helmet>

      <h2 className="text-xl font-bold mb-4 text-black">DONATION RECEIVE</h2>

      <div className="overflow-x-auto">
        <table className="w-full bg-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-400 text-left text-sm sm:text-base text-black">
              <th className="p-3 sm:p-4">DONOR ID</th>
              <th className="p-3 sm:p-4">DONOR NAME</th>
              <th className="p-3 sm:p-4">CHARITY</th>
              <th className="p-3 sm:p-4">DATE</th>
              <th className="p-3 sm:p-4">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {donations.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-black">
                  No donations yet.
                </td>
              </tr>
            ) : (
              donations.map((donation) => (
                <tr key={donation._id} className="text-sm sm:text-base text-black">
                  <td className="p-3 sm:p-4">{donation._id}</td>
                  <td className="p-3 sm:p-4">{donation.donorName}</td>
                  <td className="p-3 sm:p-4">{donation.postId?.programName || '-'}</td>
                  <td className="p-3 sm:p-4">
  {donation.createdAt
    ? new Date(donation.createdAt).toLocaleDateString()
    : '-'}
</td>

                  <td className="p-3 sm:p-4">${donation.amount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationReceivePage;
