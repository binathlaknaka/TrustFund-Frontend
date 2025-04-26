import React, { useState } from 'react';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "user", text: "Hello! I'd like to know more about your organization." },
    { id: 2, sender: "org", text: "Hi! We're happy to help. What would you like to know?" },
    { id: 3, sender: "user", text: "What are your current projects?" },
  ]);
  const [newMessage, setNewMessage] = useState('');

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

    // Simulate a response from the organization (since backend isn't ready)
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

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <div className="w-full max-w-2xl">
        {/* Chat Header */}
        <div className="bg-[#3276A6E5] text-white rounded-t-lg p-4">
          <h1 className="text-xl font-bold">Organization Name</h1>
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
                  message.sender === 'user' ? 'bg-white' : 'bg-gray-300'
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
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#3276A6E5]"
          />
          <button
            type="submit"
            className="ml-2 text-black hover:text-[#3276A6E5]"
            aria-label="Send message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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