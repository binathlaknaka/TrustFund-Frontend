import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CharityCardCategory from '../components/CharityCardCategory';
import { useDonation } from '../context/DonationContext';

const OrganizationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { charities, loading } = useDonation();

  const filteredCharities = charities.filter(charity =>
    charity.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-xl text-black">Loading Organizations...</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Organizations</title>
      </Helmet>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0 text-black">Organizations</h1>
        <div className="w-full md:w-auto md:max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search organizations..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3276A6E5] text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black hover:text-[#3276A6E5]"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCharities.length > 0 ? (
          filteredCharities.map((charity) => (
            <CharityCardCategory
              key={charity._id}
              id={charity._id}
              name={charity.fullName || 'Unnamed Organization'}
              imageSrc={
                charity.image
                  ? `http://localhost:5000/uploads/${charity.image}`
                  : 'http://localhost:5000/uploads/charity.png'
              }
              description={charity.description || 'No description provided.'}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-medium text-black">
              No organizations found matching your search.
            </h3>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 px-4 py-2 bg-[#3276A6E5] text-white rounded hover:bg-[#3276A6E5]/80"
            >
              View All Organizations
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationsPage;
