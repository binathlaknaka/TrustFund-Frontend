import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ChatList = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/chats/my-chats/${userId}`);
        const data = await res.json();
        setChats(data);
      } catch (err) {
        console.error('Failed to load chats:', err);
      }
    };

    if (userId) fetchChats();
  }, [userId]);

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center my-6 mb-16">
  <h1 className="text-3xl font-bold text-black text-center">
    Chat Room 
  </h1>
</div>

      <div className="max-w-md mx-auto">
        {chats.map((chat) => {
          const other = chat.participants.find(p => p._id !== userId);
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

export default ChatList;
