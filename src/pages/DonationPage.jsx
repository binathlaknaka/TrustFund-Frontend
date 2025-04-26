import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { useDonation } from '../context/DonationContext';

const DonationPage = () => {
  const { id, orgId } = useParams();
  const navigate = useNavigate();
  const { charities, updateDonation } = useDonation();
  const [donationAmount, setDonationAmount] = useState('');
  const [error, setError] = useState('');

  const charity = charities.find(c => c.id === parseInt(id));
  const organization = charity?.ongoingCharities.find(org => org.id === parseInt(orgId));

  if (!charity || !organization) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(`/category/${id}`)}
            className="text-black hover:text-[#3276A6E5] mr-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-black">Organization Not Found</h1>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-black mb-4">The organization you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate(`/category/${id}`)}
            className="px-4 py-2 bg-[#3276A6E5] text-white rounded hover:bg-[#3276A6E5]/80"
          >
            Return to Charity
          </button>
        </div>
      </div>
    );
  }

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(donationAmount);

    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid donation amount.');
      return;
    }

    if (amount > 1000000) {
      setError('Donation amount cannot exceed Rs. 1,000,000.');
      return;
    }

    updateDonation(id, orgId, amount);

    navigate(`/category/${id}`);
  };

  const handleBack = () => {
    navigate(`/category/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Donate</title>
      </Helmet>
      {/* Header with back button */}
      <div className="flex items-center mb-6">
        <button 
          onClick={handleBack}
          className="text-black hover:text-[#3276A6E5] mr-4"
          aria-label="Go back to charity page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Main donation section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Logo Section */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <div className="bg-white rounded-lg p-6 flex justify-center items-center border border-gray-200">
            <img 
              src={organization.imageSrc} 
              alt={`${organization.name} logo`} 
              className="max-w-full h-auto max-h-64"
              onError={(e) => {
                e.target.src = '/assets/charity.png';
              }}
            />
          </div>
          <p className="text-sm text-black text-center mt-2">
            Lorem ipsum dolor sit amet
          </p>
        </div>

        {/* Donation Form Section */}
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl font-bold text-black mb-4">Trust Program</h1>
          <p className="text-black mb-6">
            Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the Lorem ipsum is simply dummy text of the printing and typesetting industry.
          </p>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-black">Goal</span>
              <span className="text-sm text-black">Rs. {organization.raised}/{organization.goal}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-[#3276A6E5] h-2.5 rounded-full" 
                style={{ width: `${(organization.raised / organization.goal) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Donation Amount Input */}
          <form onSubmit={handleDonationSubmit}>
            <div className="mb-6">
              <label htmlFor="donationAmount" className="block text-black mb-2">
                Donation Amount
              </label>
              <input
                type="number"
                id="donationAmount"
                value={donationAmount}
                onChange={(e) => {
                  setDonationAmount(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3276A6E5] text-black"
                placeholder="Enter amount in Rs."
                min="1"
                max="1000000"
                required
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            {/* Confirm Button */}
            <button
              type="submit"
              className="w-full bg-[#3276A6E5] text-white py-3 px-6 rounded hover:bg-[#3276A6E5]/80 transition-colors"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;