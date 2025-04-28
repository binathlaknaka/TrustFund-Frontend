import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    programName: '',
    goal: '',
    programDescription: '',
    image: null
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/org/post');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Create Post | TrustFund Community</title>
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-200 rounded-lg p-6">
          <div className="flex items-start mb-6">
            <button 
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-800"
              aria-label="Back"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
            {/* Left column - Image upload */}
            <div className="md:w-1/3">
              <div className="bg-white p-4 w-full aspect-square flex items-center justify-center mb-4">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Selected" 
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-gray-400">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-20 w-20" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1} 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center">
                <label className="cursor-pointer border border-gray-400 py-2 px-4 text-center inline-block text-black">
                  Choose Image
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="hidden bg-white" 
                  />
                </label>
              </div>
            </div>
            
            {/* Right column - Form fields */}
            <div className="md:w-2/3">
              <div className="mb-4">
                <label htmlFor="programName" className="block text-black font-medium mb-2">
                  Program Name:
                </label>
                <input 
                  type="text" 
                  id="programName" 
                  name="programName" 
                  value={formData.programName} 
                  onChange={handleChange} 
                  className="w-full p-2 border border-gray-300 rounded text-black bg-white"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="goal" className="block text-black font-medium mb-2">
                  Goal:
                </label>
                <input 
                  type="text" 
                  id="goal" 
                  name="goal" 
                  value={formData.goal} 
                  onChange={handleChange} 
                  className="w-full p-2 border border-gray-300 rounded text-black bg-white"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="programDescription" className="block text-black font-medium mb-2">
                  Program Description:
                </label>
                <textarea 
                  id="programDescription" 
                  name="programDescription" 
                  value={formData.programDescription} 
                  onChange={handleChange} 
                  className="w-full p-2 border border-gray-300 rounded text-black h-40 bg-white"
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="bg-[#3276A6] text-white py-2 px-8 rounded hover:bg-[#3276A6]/90"
                >
                  Publish
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;