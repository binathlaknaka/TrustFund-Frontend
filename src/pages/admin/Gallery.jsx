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
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const handleBackClick = () => navigate('/gallery');

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
      if (previewUrl) URL.revokeObjectURL(previewUrl);
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
        setFileInputKey(Date.now());
      } else {
        setMessage(result.message || 'Upload failed.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while uploading.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      {/* <Helmet>
        <title>Gallery Upload | TrustFund</title>
      </Helmet> */}

      <div className="flex justify-between items-center my-6 mb-16">
        <h1 className="text-3xl font-bold text-black text-center w-full">
          Gallery Upload | TrustFund
        </h1>
        <button
          onClick={handleBackClick}
          className="absolute left-4 top-4 text-black hover:text-gray-700"
          title="Back"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-gray-100 p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Upload & Preview */}
          <div className="md:w-1/3">
            <div className="bg-white p-4 aspect-square flex items-center justify-center mb-4 border border-gray-300 rounded">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>

            <label className="block text-black font-medium mb-1">Upload Image</label>
            <input
              key={fileInputKey}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-black file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-black hover:file:bg-gray-300"
              required
            />
          </div>

          {/* Program Name Input */}
          <div className="md:w-2/3 space-y-4">
            <div>
              <label className="block mb-1 font-medium">Program Name</label>
              <input
                type="text"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-black"
                placeholder="Enter program name"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-[#3276A6] hover:bg-[#3276A6]/90 text-white py-2 px-4 rounded transition"
            >
              Publish
            </button>

            {message && <p className="text-sm mt-2 text-black">{message}</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default GalleryAddPage;
