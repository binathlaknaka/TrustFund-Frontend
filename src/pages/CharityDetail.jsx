import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { useDonation } from '../context/DonationContext';
import CharityCard from '../components/CharityCard';

const CharityDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { charities } = useDonation();
  const [charity, setCharity] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundCharity = charities.find(c => c._id === id);
    setCharity(foundCharity || null);
  }, [id, charities]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts?charityId=${id}`);
        const data = await res.json();
        setCampaigns(data);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, [id]);

  const handleContactClick = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      alert("Please log in to start a chat.");
      return;
    }

    const res = await fetch("http://localhost:5000/api/chats/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderId: user._id,
        receiverId: charity._id,
      }),
    });

    const data = await res.json();
    navigate(`/chat/${data.chatId}`);
  };

  const handleBack = () => navigate('/organizations');

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-xl text-black">Loading charity information...</h2>
      </div>
    );
  }

  if (!charity) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl text-black">Charity not found</h2>
        <button onClick={handleBack} className="px-4 py-2 bg-[#3276A6E5] text-white rounded">
          Back to Organizations
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{charity.fullName} Details</title>
      </Helmet>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/3">
          <img
            src={
              charity.image
                ? `http://localhost:5000/uploads/${charity.image}`
                : 'http://localhost:5000/uploads/charity.png'
            }
            alt={`${charity.fullName} logo`}
            className="rounded w-full max-h-64 object-cover"
            onError={(e) => (e.target.src = 'http://localhost:5000/uploads/charity.png')}
          />
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl font-bold text-black">{charity.fullName}</h1>
          <p className="text-black mb-4">{charity.description}</p>
          <button
            onClick={handleContactClick}
            className="bg-[#3276A6E5] text-white px-4 py-2 rounded hover:bg-[#3276A6E5]/80"
          >
            Contact
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-black">Ongoing Campaigns</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {campaigns.length > 0 ? (
          campaigns.map(campaign => (
            <CharityCard
              key={campaign._id}
              id={campaign._id}
              name={campaign.programName}
              description={campaign.programDescription}
              amount={campaign.goal}
              raised={campaign.raised || 0}
              imageUrl={`http://localhost:5000/uploads/${campaign.image}`}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-black">
            No ongoing campaigns available.
          </div>
        )}
      </div>
    </div>
  );
};

export default CharityDetailPage;
