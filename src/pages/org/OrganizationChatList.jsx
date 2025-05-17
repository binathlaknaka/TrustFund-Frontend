import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const OrganizationChatList = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);

  const org = JSON.parse(localStorage.getItem('user'));
  const orgId = org?._id;

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/chats/my-chats/${orgId}`);
        const data = await res.json();
        setChats(data);
      } catch (err) {
        console.error('Failed to load chats', err);
      }
    };

    if (orgId) fetchChats();
  }, [orgId]);

  const handleChatClick = (chatId) => {
    navigate(`/org/chat/${chatId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Organization | Chat List</title>
      </Helmet>

      <div className="max-w-md mx-auto">
        {chats.map((chat) => {
          const other = chat.participants.find(p => p._id !== orgId);
          return (
            <div
              key={chat._id}
              onClick={() => handleChatClick(chat._id)}
              className="bg-gray-200 my-3 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-300 transition"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-400"></div>
                <span className="ml-4 text-black font-medium">{other?.fullName || 'Unknown'}</span>
              </div>
              <span className="text-black text-sm">View</span>
            </div>
          );
        })}

        {chats.length === 0 && (
          <p className="text-center text-gray-600 mt-10">No conversations yet.</p>
        )}
      </div>
    </div>
  );
};

export default OrganizationChatList;
