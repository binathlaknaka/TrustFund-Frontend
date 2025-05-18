import { useState, useEffect, useRef } from 'react';
import CharityImage from '../../assets/charity.png';
import { Helmet } from 'react-helmet-async';

const API_URL = 'http://localhost:5000/api/auth';

const OrganizationProfile = () => {
  const [formData, setFormData] = useState({
    organizationId: '',
    organizationName: '',
    organizationEmail: '',
    contactNumber: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    description: '',
    image: null,       // can be file or filename
    preview: null      // for showing selected image preview
  });
  const [message, setMessage] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          console.error('No user found in localStorage');
          return;
        }
        const parsedUser = JSON.parse(storedUser);
        const email = parsedUser.email;
        if (!email) {
          console.error('No email found in stored user');
          return;
        }

        const res = await fetch(`${API_URL}/users/email/${email}`);
        const userData = await res.json();

        setFormData((prev) => ({
          ...prev,
          organizationId: userData._id,
          organizationName: userData.fullName,
          organizationEmail: userData.email,
          contactNumber: userData.mobileNumber,
          description: userData.description || '',
          image: userData.image || null,
          preview: userData.image ? `http://localhost:5000/uploads/${userData.image}` : null
        }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file)
      }));
    }
  };

  const handleEdit = async () => {
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (key === 'preview') return; // don't send preview
        if (val) data.append(key, val);
      });

      const res = await fetch(`${API_URL}/profile/${formData.organizationId}`, {
        method: 'PUT',
        body: data,
      });

      const result = await res.json();
      setMessage(result.message || 'Profile updated successfully');

      // If image was updated, reset preview URL
      if (result.user?.image) {
        setFormData((prev) => ({
          ...prev,
          preview: `http://localhost:5000/uploads/${result.user.image}`,
        }));
      }
    } catch (err) {
      console.error(err);
      setMessage('Failed to update profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/signin';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 mb-8">
      <Helmet>
        <title>Organization | Profile</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center text-black my-8">Organization Profile</h1>

      {message && <p className="text-center text-green-500 mb-4">{message}</p>}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Picture and Edit Button */}
        <div className="flex flex-col items-center space-y-8">
          <div className="flex flex-col items-center">
            <text className="text-black font-bold tect-md mb-4">Profile Picture</text>
            <div
              className="border border-gray-300 rounded-md p-4 w-64 h-64 flex items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={formData.preview || CharityImage}
                alt="Organization Logo"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <input
              type="file"
              name="image"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          <div className="flex flex-col items-center mt-8 w-full">
            <button
              onClick={handleEdit}
              className=" text-white py-2 px-8 rounded-2xl w-full max-w-xs mt-8"
              style={{ backgroundColor: '#3276A6E5' }}
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Right Column - Form Fields */}
        <div className="flex flex-col space-y-4">
          <InputField name="organizationId" value={formData.organizationId} onChange={handleChange} readOnly  /> 
          <InputField name="organizationName" value={formData.organizationName} onChange={handleChange} />
          <InputField name="organizationEmail" value={formData.organizationEmail} onChange={handleChange} />
          <InputField name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
          <InputField name="currentPassword" value={formData.currentPassword} onChange={handleChange} type="password" />
          <InputField name="newPassword" value={formData.newPassword} onChange={handleChange} type="password" />
          <InputField name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} type="password" />
          <InputField name="description" value={formData.description} onChange={handleChange} />

          <div className="mt-4 md:flex md:justify-end">
            <button
              onClick={handleLogout}
              className="bg-[#3276A6] text-white py-2 px-6 rounded-2xl mt-4 md:mt-0"
                            style={{ backgroundColor: '#3276A6E5' }}

            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ name, value, onChange, type = 'text', readOnly = false }) => {
  const formatLabel = (str) =>
    str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (char) => char.toUpperCase());

  return (
    <div>
      <label className="block text-black font-medium mb-1">{formatLabel(name)}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded p-2 text-black"
        readOnly={readOnly}
      />
    </div>
  );
};

export default OrganizationProfile;
