import React from 'react';

const WaitingApprovalPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 text-black">
      <div className="bg-white p-10 rounded shadow text-center max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Awaiting Admin Approval</h1>
        <p>Your account has been created successfully and is pending admin approval. Please check back later.</p>
      </div>
    </div>
  );
};

export default WaitingApprovalPage;
