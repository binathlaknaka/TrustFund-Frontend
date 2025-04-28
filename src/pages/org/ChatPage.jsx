import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ChatPage = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [chatData, setChatData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatData = async () => {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const chatInfo = {
        id: chatId,
        name: `User Name`,
        messages: [
          { id: 1, sender: "user", text: "Hello! I'd like to know more about your organization." },
          { id: 2, sender: "org", text: "Hi! We're happy to help. What would you like to know?" },
          { id: 3, sender: "user", text: "What are your current projects?" }
        ]
      };
      
      setChatData(chatInfo);
      setMessages(chatInfo.messages);
      setLoading(false);
    };
    
    fetchChatData();
  }, [chatId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "org",
          text: "Thanks for your message! We're currently working on several projects. Please check our website for more details.",
        },
      ]);
    }, 1000);
  };

  const handleBackClick = () => {
    navigate('/org/chats');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="text-xl">Loading chat...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center relative">
      <Helmet>
        <title>Chat with {chatData?.name || "User"}</title>
      </Helmet>
      
      {/* Back Button */}
      <button 
        onClick={handleBackClick}
        className="absolute left-4 top-12 text-gray-600 hover:text-gray-800"
        aria-label="Back to chats"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 w-8" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 19l-7-7 7-7" 
          />
        </svg>
      </button>
      
      <div className="w-full max-w-lg">
        {/* Chat Header */}
        <div className="bg-[#3276A6] text-white rounded-t-lg p-4">
          <h1 className="text-xl font-bold text-center">{chatData?.name || "User Name"}</h1>
        </div>

        {/* Chat Messages */}
        <div className="bg-gray-200 h-[400px] overflow-y-auto p-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex mb-4 ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  message.sender === 'user' ? 'bg-white' : 'bg-white'
                }`}
              >
                <p className="text-black">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="flex items-center p-4 bg-white border-t border-gray-300 rounded-b-lg">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#3276A6]"
          />
          <button
            type="submit"
            className="ml-2 text-gray-600 hover:text-[#3276A6]"
            aria-label="Send message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;