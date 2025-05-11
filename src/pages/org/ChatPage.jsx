import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ChatPage = ({ userId, role }) => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState({});
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`http://localhost:5000/api/messages/${chatId}`);
      const data = await res.json();
      setMessages(data);
      const other = data[0]?.sender._id === userId ? data[0]?.receiver : data[0]?.sender;
      setChatUser(other);
    };
    fetchMessages();
  }, [chatId, userId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const res = await fetch(`http://localhost:5000/api/messages/${chatId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senderId: userId, text: newMessage }),
    });
    const data = await res.json();
    setMessages([...messages, data]);
    setNewMessage('');
  };

  const handleBackClick = () => navigate(`/${role}/chats`);

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center relative">
      <Helmet>
        <title>Chat with {chatUser.fullName}</title>
      </Helmet>
      <button
        onClick={handleBackClick}
        className="absolute left-4 top-12 text-gray-600 hover:text-gray-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="w-full max-w-lg">
        <div className="bg-[#3276A6] text-white rounded-t-lg p-4">
          <h1 className="text-xl font-bold text-center">{chatUser.fullName}</h1>
        </div>

        <div className="bg-gray-200 h-[400px] overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex mb-4 ${message.sender._id === userId ? 'justify-end' : 'justify-start'}`}
            >
              <div className="max-w-xs p-3 rounded-lg bg-white">
                <p className="text-black">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="flex items-center p-4 bg-white border-t border-gray-300 rounded-b-lg">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#3276A6]"
          />
          <button type="submit" className="ml-2 text-gray-600 hover:text-[#3276A6]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
