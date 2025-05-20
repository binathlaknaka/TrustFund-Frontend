import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Adjust if deployed

const OrganizationChatPage = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState({ fullName: 'Loading...' });
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;

  useEffect(() => {
    socket.emit('join-chat', chatId);
    console.log('[OrganizationChatPage] Joined room:', chatId);

    const fetchChatData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/messages/${chatId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Failed to load messages');
        setMessages(data);
        setLoading(false);

        if (data.length > 0) {
          const first = data[0];
          const other = first.sender._id === userId ? first.receiver : first.sender;
          setChatUser(other);
        } else {
          const chatRes = await fetch(`http://localhost:5000/api/chats/${chatId}`);
          const chatData = await chatRes.json();
          const other = chatData.participants.find(p => p._id !== userId);
          setChatUser(other || { fullName: 'New Chat' });
        }
      } catch (err) {
        console.error('[OrganizationChatPage] ERROR:', err);
        setError('Failed to load chat');
        setLoading(false);
      }
    };

    fetchChatData();

    socket.on('receive-message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socket.off('receive-message');
  }, [chatId, userId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await fetch(`http://localhost:5000/api/messages/${chatId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId: userId, text: newMessage }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Send failed');

      socket.emit('send-message', data);
      setNewMessage('');
    } catch (err) {
      console.error('[OrganizationChatPage] ERROR sending message:', err);
      setError('Message send failed');
    }
  };

  const handleBackClick = () => {
    console.log('[OrganizationChatPage] Redirecting to chat list...');
    navigate('/org/chats'); // ✅ Redirect to chat list
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center relative">

      <button onClick={handleBackClick} className="absolute left-4 top-12 text-gray-600 hover:text-gray-800">
        ← Back
      </button>

      <div className="w-full max-w-lg border rounded-lg shadow">
        <div className="bg-[#3276A6] text-white rounded-t-lg p-4">
          <h1 className="text-xl font-bold text-center">{chatUser?.fullName || 'Chat'}</h1>
        </div>

        <div className="bg-gray-100 h-[400px] overflow-y-auto p-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading messages...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : messages.length === 0 ? (
            <p className="text-center text-gray-600">No messages yet. Start the conversation!</p>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex mb-4 ${message.sender._id === userId ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-xs p-3 rounded-lg bg-white">
                  <p className="text-black">{message.text}</p>
                </div>
              </div>
            ))
          )}
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
            ➤
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrganizationChatPage;
