import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatList = () => {
  const navigate = useNavigate();
  
  const chats = [
    { id: 1, name: "Name Lorem" },
    { id: 2, name: "Name Lorem" },
    { id: 3, name: "Name Lorem" },
    { id: 4, name: "Name Lorem" },
    { id: 5, name: "Name Lorem" },
    { id: 6, name: "Name Lorem" }
  ];
  
  const handleChatClick = (chatId) => {
    navigate(`/org/chat/${chatId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Chat List */}
      <div className="max-w-md mx-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleChatClick(chat.id)}
            className="bg-gray-200 my-3 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-300 transition"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-400"></div>
              <span className="ml-4 text-black">{chat.name}</span>
            </div>
            <span className="text-black">1</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;