import { useState } from 'react';
import CharityImage from '../../assets/charity.png';
import { Helmet } from 'react-helmet-async';

const OrganizationProfile = () => {
  const [formData, setFormData] = useState({
    organizationId: '',
    organizationName: '',
    organizationEmail: '',
    contactNumber: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEdit = () => {
    console.log('Editing organization profile:', formData);
  };

  const handleLogout = () => {
    console.log('Logging out');
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Helmet>
        <title>Organization | Profile</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center text-black my-8">Organization Profile</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Picture and Donation */}
        <div className="flex flex-col items-center space-y-8">
          <div className="flex flex-col items-center">
            <div className="border border-gray-300 rounded-md p-4 w-64 h-64 flex items-center justify-center">
              <img 
                src={CharityImage}
                alt="Organization Logo" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <h2 className="text-xl font-semibold text-black mt-4">Organization Picture</h2>
          </div>
          
          <div className="flex flex-col items-center mt-8 w-full">
            <h2 className="text-xl font-semibold text-black">Total Received Donation</h2>
            <p className="text-4xl font-bold text-black mt-2">Rs.10000</p>
            
            <button 
              onClick={handleEdit}
              className="bg-[#3276A6] text-white py-2 px-8 rounded w-full max-w-xs mt-8"
            >
              Edit
            </button>
          </div>
        </div>
        
        {/* Right Column - Form Fields */}
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-black font-medium mb-1">Organization ID</label>
            <input
              type="text"
              name="organizationId"
              value={formData.organizationId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 text-black"
            />
          </div>
          
          <div>
            <label className="block text-black font-medium mb-1">Organization Name</label>
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 text-black"
            />
          </div>
          
          <div>
            <label className="block text-black font-medium mb-1">Organization Email</label>
            <input
              type="email"
              name="organizationEmail"
              value={formData.organizationEmail}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 text-black"
            />
          </div>
          
          <div>
            <label className="block text-black font-medium mb-1">Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 text-black"
            />
          </div>
          
          <div>
            <label className="block text-black font-medium mb-1">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 text-black"
            />
          </div>
          
          <div>
            <label className="block text-black font-medium mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 text-black"
            />
          </div>
          
          <div>
            <label className="block text-black font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 text-black"
            />
          </div>
          
          <div className="mt-4 md:flex md:justify-end">
            <button 
              onClick={handleLogout}
              className="bg-[#3276A6] text-white py-2 px-6 rounded mt-4 md:mt-0"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationProfile;