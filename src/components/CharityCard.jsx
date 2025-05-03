import React from 'react';
import { useNavigate } from 'react-router-dom';

const CharityCard = ({ id, name, description, amount, raised = 0, imageUrl }) => {
  const navigate = useNavigate();
  const handleDonate = () => navigate(`/donate/${id}`);

  const progress = Math.min((raised / amount) * 100, 100); // cap at 100%

  return (
    <div className="border rounded-md p-4 bg-blue-50">
      <img src={imageUrl} alt={name} className="w-full h-40 object-cover rounded mb-2" />
      <h2 className="font-bold text-black">{name}</h2>
      <p className="text-sm mb-2 text-black">{description}</p>

      {/* Progress Bar */}
      <div className="mb-2">
        <div className="flex justify-between text-xs mb-1 text-black">
          <span>Raised: $ {raised || 0}</span>
          <span>Goal: $ {amount}</span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center text-black mt-2">
        <div className="text-sm">$ {amount}</div>
        <button
          onClick={handleDonate}
          className="bg-white text-black border px-3 py-1 rounded"
        >
          Donate
        </button>
      </div>
    </div>
  );
};

export default CharityCard;
