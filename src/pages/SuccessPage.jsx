import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get('postId');
  const amount = parseFloat(queryParams.get('amount'));
  const donorEmail = queryParams.get('donorEmail');
  const donorName = queryParams.get('donorName');
  const sessionId = queryParams.get('session_id');  // Stripe session ID

  useEffect(() => {
    const recordDonation = async () => {
      try {
        await fetch('http://localhost:5000/api/donations/record', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            postId,
            donorName,
            donorEmail,
            amount,
            sessionId,
          }),
        });
      } catch (err) {
        console.error('Failed to record donation', err);
      }
    };

    if (postId && amount && sessionId) {
      recordDonation();
    }

    const timer = setTimeout(() => {
      navigate('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [postId, amount, donorName, donorEmail, sessionId, navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg text-green-800">Thank you for your donation. Redirecting to home...</p>
    </div>
  );
};

export default SuccessPage;
