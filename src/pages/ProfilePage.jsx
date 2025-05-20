import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ProfileImageTemp from '../assets/profile.png';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [donationHistory, setDonationHistory] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?._id;
  const userEmail = storedUser?.email;

  useEffect(() => {
    const fetchProfileAndDonations = async () => {
      try {
        const [profileRes, donationsRes] = await Promise.all([
          fetch(`http://localhost:5000/api/users/profile/${userId}`),
          fetch(`http://localhost:5000/api/donations/history/${userEmail}`),
        ]);

        const profileData = await profileRes.json();
        const donationData = await donationsRes.json();

        setProfile({
          ...profileData,
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
          preview: '', // For previewing new image
        });

        setDonationHistory(donationData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    if (userId && userEmail) fetchProfileAndDonations();
  }, [userId, userEmail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({
        ...prev,
        image: reader.result, 
        preview: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        const res = await fetch(`http://localhost:5000/api/users/profile/${profile._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile),
        });
        const updated = await res.json();
        setProfile({
          ...updated,
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
          preview: '',
        });
        console.log('Profile updated');
      } catch (error) {
        console.error('Failed to update profile:', error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (!profile) return <div className="text-black text-center mt-12">Loading profile...</div>;

  const totalDonation = donationHistory.reduce((sum, d) => sum + Number(d.amount || 0), 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="w-full mt-16 md:w-1/3 flex flex-col items-center">
          <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
            <img
              src={profile.preview || profile.image || ProfileImageTemp}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => (e.target.src = ProfileImageTemp)}
            />
          </div>

          {isEditing && (
           <input
      id="imageUpload"
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="text-black file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-black"
    />
          )}

          <div className="text-center">
            <h3 className="text-xl font-semibold text-black">Total Donation</h3>
            <p className="text-black">$ {totalDonation}</p>
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <h1 style={{ color: '#3276A6E5' }} className="text-3xl font-bold mb-6">PROFILE</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 gap-4">
              <Input label="Full Name" name="fullName" value={profile.fullName} onChange={handleInputChange} editable={isEditing} />
              <Input label="Email" name="email" value={profile.email} onChange={handleInputChange} editable={false} />
              <Input label="NIC Number" name="nicNumber" value={profile.nicNumber} onChange={handleInputChange} editable={isEditing} />
              <Input label="Occupation" name="occupation" value={profile.occupation} onChange={handleInputChange} editable={isEditing} />
              <Input label="Mobile Number" name="mobileNumber" value={profile.mobileNumber} onChange={handleInputChange} editable={isEditing} />
              <Input label="Description" name="description" value={profile.description} onChange={handleInputChange} editable={isEditing} />

              {isEditing && (
                <>
                  <Input label="Current Password" name="currentPassword" type="password" value={profile.currentPassword} onChange={handleInputChange} />
                  <Input label="New Password" name="newPassword" type="password" value={profile.newPassword} onChange={handleInputChange} />
                  <Input label="Confirm New Password" name="confirmNewPassword" type="password" value={profile.confirmNewPassword} onChange={handleInputChange} />
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

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-black mb-6">Donation History</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-100 rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-black">Program</th>
                <th className="px-4 py-2 text-left text-black">Date</th>
                <th className="px-4 py-2 text-left text-black">Amount</th>
              </tr>
            </thead>
            <tbody>
              {donationHistory.map((d, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="px-4 py-2 text-black">{d.postId}</td>
                  <td className="px-4 py-2 text-black">{new Date(d.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-black">$ {d.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-12 mb-12 flex justify-end">
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

const Input = ({ label, name, value, onChange, editable = true, type = 'text' }) => (
  <div>
    <label className="block text-black mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value || ''}
      onChange={onChange}
      className={`w-full px-4 py-2 border border-gray-100 rounded-2xl text-black ${editable ? '' : 'bg-gray-100'}`}
      disabled={!editable}
    />
  </div>
);

export default ProfilePage;
