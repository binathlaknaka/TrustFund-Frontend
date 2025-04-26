import React, { useState } from 'react';
import ProfileImageTemp from '../assets/profile.png';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    donorId: "12345",
    name: "John Doe",
    email: "john.doe@example.com",
    nic: "123456789V",
    occupation: "Software Engineer",
    mobile: "+94 123 456 789",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [donationHistory] = useState([
    { charityId: "CH001", date: "2025-01-15", organization: "World Health Fund", amount: "Rs. 5000" },
    { charityId: "CH002", date: "2025-02-20", organization: "Education For All", amount: "Rs. 3000" },
    { charityId: "CH003", date: "2025-03-10", organization: "Clean Water Project", amount: "Rs. 2000" },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      console.log("Profile updated:", profile);
      setProfile(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }));
    }
  };

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        {/* Profile Picture and Total Donation */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            <img
              src={ProfileImageTemp}
              alt="Profile Picture"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/assets/profile-placeholder.jpg';
              }}
            />
          </div>
          <h2 className="text-xl font-bold text-black mb-2">Profile Picture</h2>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-black">Total Donation</h3>
            <p className="text-black">Rs. 10000</p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl font-bold text-black mb-6">Profile</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-black mb-1">Donor ID</label>
                <input
                  type="text"
                  value={profile.donorId}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black bg-gray-100"
                  disabled
                />
              </div>
              <div>
                <label className="block text-black mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-black ${isEditing ? '' : 'bg-gray-100'}`}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-black mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-black ${isEditing ? '' : 'bg-gray-100'}`}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-black mb-1">NIC Number</label>
                <input
                  type="text"
                  name="nic"
                  value={profile.nic}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-black ${isEditing ? '' : 'bg-gray-100'}`}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-black mb-1">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={profile.occupation}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-black ${isEditing ? '' : 'bg-gray-100'}`}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-black mb-1">Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  value={profile.mobile}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-black ${isEditing ? '' : 'bg-gray-100'}`}
                  disabled={!isEditing}
                />
              </div>
              {isEditing && (
                <>
                  <div>
                    <label className="block text-black mb-1">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={profile.currentPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-black mb-1">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={profile.newPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-black mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmNewPassword"
                      value={profile.confirmNewPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
                    />
                  </div>
                </>
              )}
            </div>
            <button
              onClick={handleEditToggle}
              className="mt-6 px-6 py-2 bg-[#3276A6E5] text-white rounded hover:bg-[#3276A6E5]/80 transition-colors"
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>
      </div>

      {/* Donation History */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-black mb-6">Donation History</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-100 rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-black">Charity ID</th>
                <th className="px-4 py-2 text-left text-black">Date</th>
                <th className="px-4 py-2 text-left text-black">Organization</th>
                <th className="px-4 py-2 text-left text-black">Amount</th>
              </tr>
            </thead>
            <tbody>
              {donationHistory.map((donation, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="px-4 py-2 text-black">{donation.charityId}</td>
                  <td className="px-4 py-2 text-black">{donation.date}</td>
                  <td className="px-4 py-2 text-black">{donation.organization}</td>
                  <td className="px-4 py-2 text-black">{donation.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-[#3276A6E5] text-white rounded hover:bg-[#3276A6E5]/80 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;