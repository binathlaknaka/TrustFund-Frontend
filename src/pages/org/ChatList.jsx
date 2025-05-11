import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ChatList = ({ userId, role }) => {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const res = await fetch(`http://localhost:5000/api/chats/${userId}`);
      const data = await res.json();
      setChats(data);
    };
    fetchChats();
  }, [userId]);

  const handleChatClick = (chatId) => {
    navigate(`/${role}/chats/${chatId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{role === 'org' ? 'Organizations' : 'Donors'} | Chat List</title>
      </Helmet>
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
                <span className="ml-4 text-black">{other.fullName}</span>
              </div>
              <span className="text-black">New</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
