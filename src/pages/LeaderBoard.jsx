import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Trophy from '../assets/trophy.png';

export default function Leaderboard() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  
  const leaderboardData = [
    { id: 1, name: 'Name Lorem', location: 'Colombo', points: 5000 },
    { id: 2, name: 'Name Lorem', location: 'Colombo', points: 5000 },
    { id: 3, name: 'Name Lorem', location: 'Colombo', points: 5000 },
    { id: 4, name: 'Name Lorem', location: 'Colombo', points: 5000 },
    { id: 5, name: 'Name Lorem', location: 'Colombo', points: 5000 },
    { id: 6, name: 'Name Lorem', location: 'Colombo', points: 5000 }
  ];
  
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-black">
      {/* Header with back button */}
      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate('/')} 
          className="mr-4"
          aria-label="Go back to home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-center flex-grow">Leaderboard</h1>
      </div>
      
      {/* Filters */}
      <div className="flex justify-center mb-6">
        <div className="flex border-b border-gray-300">
          {['All', 'Week', 'Month'].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 ${activeFilter === filter ? 'border-b-2 border-black font-medium' : ''}`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Leaderboard List */}
        <div className="w-full md:w-1/2 space-y-3">
          {leaderboardData.map((user) => (
            <div 
              key={user.id} 
              className="flex items-center justify-between bg-gray-200 rounded-lg p-3"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-400 rounded-full mr-3"></div>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.location}</div>
                </div>
              </div>
              <div className="font-medium">{user.points}</div>
            </div>
          ))}
        </div>
        
        {/* Trophy Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center border border-blue-400 rounded-lg p-4">
          <img 
            src={Trophy}
            alt="Trophy illustration" 
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}