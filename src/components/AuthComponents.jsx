import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInImage from '../assets/signin.png';
import SignUpImage from '../assets/signup.png';
import { AuthContext } from '../context/AuthContext'; // Optional, if you set it up

const API_URL = 'http://localhost:5000/api/auth';

export function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    occupation: '',
    mobileNumber: '',
    nicNumber: '',
    nicDocument: null,
    role: ''
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
    if (!formData.role) newErrors.role = 'Role is required';
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

      const res = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        body: data
      });
      const result = await res.json();

      if (res.ok) {
        setMessage('Signup successful! Redirecting...');
        setTimeout(() => navigate('/signin'), 1500);
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
          <img src={SignUpImage} alt="Signup" className="w-56 mb-6" />
          <p className="text-center mt-2 text-lg">
            Already have an account? <button onClick={() => navigate('/signin')} className="underline">Signin</button>
          </p>
          {message && <p className="mt-4 text-center text-white">{message}</p>}
        </div>
        <div className="md:w-2/3 md:pl-12">
          <h2 className="text-white text-3xl font-bold mb-6 text-center md:text-right">Signup</h2>
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
                <label className="block text-base mb-2">Role</label>
                <select name="role" value={formData.role} onChange={handleChange} className="w-full p-3 rounded bg-white text-black text-base">
                  <option value="">Select Role</option>
                  <option value="donor">Donor</option>
                  <option value="charity">Charity</option>
                </select>
                {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
              </div>
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
            <button type="submit" className="mt-8 bg-white font-medium py-3 px-8 rounded w-full text-lg">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', role: '' });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.role) newErrors.role = 'Role is required';
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
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (res.ok) {
        if (login) login(result.user);
localStorage.setItem('token', result.token);
localStorage.setItem('user', JSON.stringify(result.user));

        setMessage('Login successful! Redirecting...');

        // ➜ Redirect based on role
        let redirectPath = '/';
        if (result.user.role === 'charity') redirectPath = '/org/donations';
        if (result.user.role === 'donor') redirectPath = '/';
        if (result.user.role === 'admin') redirectPath = '/admin/dashboard';

        setTimeout(() => navigate(redirectPath), 1500);
      } else {
        setMessage(result.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred during login');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <div style={{ backgroundColor: '#3276A6E5' }} className="rounded-lg p-12 w-full max-w-5xl flex flex-col md:flex-row shadow-lg">
        <div className="md:w-1/2 pr-0 md:pr-8">
          <h2 className="text-white text-3xl font-bold mb-6 text-center md:text-left">Signin</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-base mb-2">Role</label>
              <select name="role" value={formData.role} onChange={handleChange} className="w-full p-3 rounded bg-white text-black text-base">
                <option value="">Select Role</option>
                <option value="donor">Donor</option>
                <option value="charity">Charity</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
            </div>
            <div>
              <label className="block text-base mb-2">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 rounded bg-white text-black text-base" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-base mb-2">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-3 rounded bg-white text-black text-base" />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <button type="submit" className="w-full bg-white text-black font-medium py-3 px-4 rounded text-lg">Signin</button>
          </form>
          {message && <p className="mt-4 text-center">{message}</p>}
        </div>
        <div className="md:w-1/2 flex flex-col items-center justify-center mt-8 md:mt-0">
          <img src={SignInImage} alt="Signin" className="w-64 h-auto" />
          <div className="mt-6 text-center">
            <p className="text-black text-lg">
              No account? <button onClick={() => navigate('/signup')} className="underline">Signup</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
