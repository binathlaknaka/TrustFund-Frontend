import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const API_URL = 'http://localhost:5000/api/gallery';

const GalleryAddPage = () => {
  const navigate = useNavigate();
  const [programName, setProgramName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [message, setMessage] = useState('');
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // ✨ new key state

  const handleBackClick = () => {
    navigate('/gallery');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setMessage('');
    } else {
      setSelectedFile(null);
      setPreviewUrl('');
      setMessage('Please select a valid image file.');
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!programName || !selectedFile) {
      setMessage('Please enter a program name and select an image.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('programName', programName);
      formData.append('image', selectedFile);

      const res = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        setMessage('Image uploaded successfully!');
        setProgramName('');
        setSelectedFile(null);
        setPreviewUrl('');
        setFileInputKey(Date.now()); // ✨ reset file input
      } else {
        setMessage(result.message || 'Upload failed.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while uploading.');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <Helmet>
        <title>Admin | Gallery</title>
      </Helmet>

      <button
        onClick={handleBackClick}
        className="mb-4 text-black hover:text-gray-700"
      >
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>

      <form onSubmit={handleSubmit}>
        <div className="bg-gray-300 rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
          {/* Image Upload Preview Area */}
          <div className="w-full sm:w-1/2 h-48 sm:h-64 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '';
                }}
              />
            ) : (
              <span className="text-gray-500">No image selected</span>
            )}
          </div>

          {/* Form Inputs */}
          <div className="w-full sm:w-1/2 flex flex-col gap-4">
            <div>
              <label className="block text-sm sm:text-base font-medium text-black mb-2">
                Program Name:
              </label>
              <input
                type="text"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter program name"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-medium text-black mb-2">
                Image Add:
              </label>
              <input
                key={fileInputKey} // ✨ force remount to clear file input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-400 rounded-lg text-sm sm:text-base text-black file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-black hover:file:bg-gray-300"
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-[#3276A6] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#2b658f] self-end"
            >
              Publish
            </button>
            {message && <p className="mt-2 text-sm text-black">{message}</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default GalleryAddPage;
