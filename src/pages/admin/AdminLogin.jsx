import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInImage from '../../assets/adminlogin.jpg';
import { AuthContext } from '../../context/AuthContext';

const API_URL = 'http://localhost:5000/api/auth';

export function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
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
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: 'admin' })
      });
      const result = await res.json();
      if (res.ok) {
        if (login) login(result.user);
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        setMessage('Admin login successful! Redirecting...');
        setTimeout(() => navigate('/admin/dashboard'), 1500);
      } else {
        setMessage(result.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred during login');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white text-black">
      <div className="p-4 w-full max-w-6xl flex flex-col md:flex-row">
        {/* Left - Image + Title */}
        <div className="md:w-1/2 flex flex-col items-center justify-center mt-8 md:mt-0">
          <h2
            style={{ color: '#3276A6E5' }}
            className="text-5xl font-bold mb-6 text-center md:text-left"
          >
            Admin Login
          </h2>
          <img src={SignInImage} alt="Admin Signin" className="w-full h-auto" />
        </div>

        {/* Right - Login Form */}
        <div className="md:w-1/2 pr-0 md:pl-4 pr-8 h-full mt-16">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                style={{ color: '#3276A6E5' }}
                className="block text-base mb-2 font-bold"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-100 text-black text-base"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label
                style={{ color: '#3276A6E5' }}
                className="block text-base mb-2 font-bold"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-100 text-black text-base"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <button
              type="submit"
              style={{ backgroundColor: '#3276A6E5' }}
              className="rounded-2xl w-full text-white font-medium py-3 px-4 text-lg mt-16 cursor-pointer"
            >
              Login as Admin
            </button>
          </form>
          {message && (
            <p style={{ color: '#3276A6E5' }} className="text-center mt-4">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
