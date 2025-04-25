import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInImage from '../assets/signin.png';
import SignUpImage from '../assets/signup.png';

// SignUp Component
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, nicDocument: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign Up Form Data:', formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <div style={{ backgroundColor: '#3276A6E5' }} className="rounded-lg p-8 w-full max-w-4xl flex flex-col md:flex-row shadow-lg">
        {/* Left Section with Image */}
        <div className="flex flex-col items-center justify-center md:w-1/3 p-4">
          <img 
            src={SignUpImage}
            alt="Girl with heart" 
            className="w-40 mb-4"
          />
          <p className="text-center mt-2">
            Want Login? <button onClick={() => navigate('/signin')} className="underline">Signin</button>
          </p>
          <button 
            onClick={handleSubmit}
            className="mt-6 bg-white font-medium py-2 px-6 rounded w-full"
          >
            Signup
          </button>
        </div>
        
        {/* Right Section with Form */}
        <div className="md:w-2/3 md:pl-8">
          <h2 className="text-white text-xl font-bold mb-4 flex justify-center md:text-right">Signup</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="donor">Donor</option>
                  <option value="charity">Charity</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1">Mobile Number</label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1">NIC Number</label>
                <input
                  type="text"
                  name="nicNumber"
                  value={formData.nicNumber}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1">NIC Photo / Legal document</label>
                <div className="flex">
                  <input
                    type="text"
                    className="w-3/4 p-2 rounded-l"
                    placeholder="No file chosen"
                    readOnly
                    value={formData.nicDocument ? formData.nicDocument.name : ''}
                  />
                  <label className="w-1/4 bg-gray-200 text-center p-2 rounded-r cursor-pointer">
                    Select
                    <input
                      type="file"
                      name="nicDocument"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// SignIn Component
export function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign In Form Data:', formData);
    // navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <div style={{ backgroundColor: '#3276A6E5' }} className="ounded-lg p-8 w-full max-w-3xl flex flex-col md:flex-row shadow-lg">
        {/* Left Section with Form */}
        <div className="md:w-1/2 pr-0 md:pr-6">
          <h2 className="text-white text-xl font-bold mb-6 text-center md:text-left">Signin</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white text-black"
                required
              >
                <option value="">Select Role</option>
                <option value="donor">Donor</option>
                <option value="charity">Charity</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white text-black"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white text-black"
                required
              />
            </div>
            
            <div className="text-center md:text-left">
              <a href="#" className=" text-sm">Can't signin? Forgot password</a>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-white text-black font-medium py-2 px-4 rounded"
            >
              Signin
            </button>
          </form>
        </div>
        
        {/* Right Section with Image */}
        <div className="md:w-1/2 flex flex-col items-center justify-center mt-6 md:mt-0">
          <img 
            src={SignInImage}
            alt="Donation box with hand" 
            className="w-48 h-auto"
          />
          <div className="mt-4 text-center">
            <p className="text-black">
              No Account? <button onClick={() => navigate('/signup')} className="underline">Signup</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}