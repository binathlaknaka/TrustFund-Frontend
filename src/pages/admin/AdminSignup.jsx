import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpImage from '../../assets/signup.png';

const API_URL = 'http://localhost:5000/api/auth';

export function AdminSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    occupation: '',
    mobileNumber: '',
    nicNumber: '',
    nicDocument: null
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, nicDocument: e.target.files[0] }));
    setErrors((prev) => ({ ...prev, nicDocument: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.nicDocument) newErrors.nicDocument = 'NIC document is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      data.append('role', 'admin'); // hardcode role

      const res = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        body: data
      });
      const result = await res.json();

      if (res.ok) {
        setMessage('Admin signup successful! Redirecting...');
        setTimeout(() => navigate('/admin-login'), 1500);
      } else {
        setMessage(result.message || 'Signup failed');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred during signup');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <div style={{ backgroundColor: '#3276A6E5' }} className="rounded-lg p-12 w-full max-w-6xl flex flex-col md:flex-row shadow-lg">
        <div className="flex flex-col items-center justify-center md:w-1/3 p-6">
          <img src={SignUpImage} alt="Admin Signup" className="w-56 mb-6" />
          <p className="text-center mt-2 text-lg">
            Already have an account? <button onClick={() => navigate('/admin/login')} className="underline">Admin Login</button>
          </p>
          {message && <p className="mt-4 text-center text-white">{message}</p>}
        </div>
        <div className="md:w-2/3 md:pl-12">
          <h2 className="text-white text-3xl font-bold mb-6 text-center md:text-right">Admin Signup</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Full Name', name: 'fullName', type: 'text' },
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Password', name: 'password', type: 'password' },
                { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
                { label: 'Occupation', name: 'occupation', type: 'text' },
                { label: 'Mobile Number', name: 'mobileNumber', type: 'tel' },
                { label: 'NIC Number', name: 'nicNumber', type: 'text' }
              ].map(field => (
                <div key={field.name}>
                  <label className="block text-base mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-white text-black text-base"
                  />
                  {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
                </div>
              ))}
              <div>
                <label className="block text-base mb-2">NIC Document</label>
                <div className="flex">
                  <input type="text" readOnly value={formData.nicDocument ? formData.nicDocument.name : ''} className="w-3/4 p-3 rounded-l text-base" />
                  <label className="w-1/4 bg-gray-200 text-center p-3 rounded-r cursor-pointer">
                    Select
                    <input type="file" name="nicDocument" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>
                {errors.nicDocument && <p className="text-red-500 text-sm">{errors.nicDocument}</p>}
              </div>
            </div>
            <button type="submit" className="mt-8 bg-white font-medium py-3 px-8 rounded w-full text-lg">
              Signup as Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminSignup;
