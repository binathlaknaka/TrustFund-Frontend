import React from 'react';
import { useNavigate } from 'react-router-dom';

const CharityCardCategory = ({ id, name, description, imageSrc }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/charity/${id}`);

  return (
    <div
      onClick={handleClick}
      className="border rounded-md p-4 bg-blue-50 cursor-pointer hover:shadow-md transition-shadow"
    >
      <img src={imageSrc} alt={name} className="w-full h-40 object-cover rounded mb-2" />
      <h2 className="font-bold text-black">{name}</h2>
      <p className="text-sm mb-2 text-black">{description}</p>
    </div>
  );
};

export default CharityCardCategory;
