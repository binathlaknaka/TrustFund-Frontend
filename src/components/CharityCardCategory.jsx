import React from 'react';
import { Link } from 'react-router-dom';

const CharityCard = ({ name, imageSrc, description, id }) => {
  return (
    <Link
      to={`/charity/${id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-105 flex flex-col h-full cursor-pointer"
    >
      <div className="p-6 flex flex-col items-center">
        <img
          src={imageSrc || "/assets/charity.png"} // Adjusted fallback path to match public/assets
          alt={`${name} logo`}
          className="h-32 w-32 object-contain mb-4"
          onError={(e) => {
            e.target.src = '/assets/charity.png'; // Fallback on error
          }}
        />
        <h3 className="text-2xl font-bold text-center mb-2 text-black">{name || "Charity"}</h3>
        <p className="text-black text-center text-sm">
          {description || "Lorem Ipsum Dolor Sit Amet"}
        </p>
      </div>
    </Link>
  );
};

export default CharityCard;