import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RKc2MPbl3KSyR3oVvvTsslNNEVbN5cwqhKnkw8GjpbJponyV5GCbvjmogYeo4M5VrwfKNZuXO4tmTTzSQ1QFNv700VKZfpoZU');
const storedUser = JSON.parse(localStorage.getItem('user'));

const DonationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [charity, setCharity] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCharity = async () => {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`);
      const data = await res.json();
      setCharity(data);
    };
    fetchCharity();
  }, [id]);

  const handleBack = () => {
    navigate('/');
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(donationAmount);
    const remainingAmount = charity.goal - charity.raised;
  
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid donation amount.');
      return;
    }
  
    if (amount > 1000000) {
      setError('Donation amount cannot exceed Rs. 1,000,000.');
      return;
    }
  
    if (amount > remainingAmount) {
      setError(`You can only donate up to Rs. ${remainingAmount} to reach the goal.`);
      return;
    }
  
    try {
      const stripe = await stripePromise;
      const res = await fetch('http://localhost:5000/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          programName: charity.programName,
          postId: charity._id,
          donorEmail: storedUser?.email || 'anonymous@example.com',
          donorName: storedUser?.name || 'Anonymous',
        }),
      });
  
      const session = await res.json();
  
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
  
      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };
  

  if (!charity) {
    return <div className="text-center py-8">Loading charity info...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Donate to {charity.programName}</title>
      </Helmet>

      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="text-black hover:text-blue-600 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-black">{charity.programName}</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <div className="bg-white rounded-lg p-6 flex justify-center items-center border border-gray-200">
            <img
              src={`http://localhost:5000/uploads/${charity.image}`}
              alt={`${charity.programName} logo`}
              className="max-w-full h-auto max-h-64"
              onError={(e) => {
                e.target.src = '/assets/charity.png';
              }}
            />
          </div>
          <p className="text-sm text-black text-center mt-2">{charity.organizationName}</p>
        </div>

        {/* Donation Form Section */}
        <div className="w-full md:w-2/3">
          <h2 className="text-xl font-bold text-black mb-4">{charity.programName}</h2>
          <p className="text-black mb-6">{charity.programDescription}</p>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-black">Goal</span>
              <span className="text-sm text-black">Rs. {charity.raised || 0} / {charity.goal}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${(charity.raised / charity.goal) * 100}%` }}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
                placeholder="Enter amount in Rs."
                min="1"
                max="1000000"
                required
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            {/* Confirm Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition-colors"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
