import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const GalleryAddPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/gallery');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <Helmet>
            <title>Admin | Gallery</title>
        </Helmet>
      {/* Back Arrow */}
      <button
        onClick={handleBackClick}
        className="mb-4 text-black hover:text-gray-700"
      >
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>

      {/* Form Section */}
      <div className="bg-gray-300 rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
        {/* Image Upload Preview Area */}
        <div className="w-full sm:w-1/2 h-48 sm:h-64 bg-gray-200 flex items-center justify-center rounded-lg">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
        </div>

        {/* Form Inputs */}
        <div className="w-full sm:w-1/2 flex flex-col gap-4">
          <div>
            <label className="block text-sm sm:text-base font-medium text-black mb-2">
              Program Name:
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium text-black mb-2">
              Image Add:
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border border-gray-400 rounded-lg text-sm sm:text-base text-black file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-black hover:file:bg-gray-300"
            />
          </div>
          <button className="mt-4 bg-[#3276A6] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#2b658f] self-end">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryAddPage;