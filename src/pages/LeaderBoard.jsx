import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Trophy from '../assets/trophy.png';

export default function Leaderboard() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async (filter) => {
    let range = '';
    if (filter === 'Day') range = 'day';
    else if (filter === 'Week') range = 'week';
    else if (filter === 'Month') range = 'month';

    try {
      const res = await fetch(`http://localhost:5000/api/donations/leaderboard${range ? `?range=${range}` : ''}`);
      const data = await res.json();
      setLeaderboard(data);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    }
  };

  useEffect(() => {
    fetchLeaderboard(activeFilter);
  }, [activeFilter]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-black">
      <Helmet>
        <title>Leaderboard</title>
      </Helmet>

      <div className="flex items-center mb-8">
        <button onClick={() => navigate('/')} className="mr-4" aria-label="Go back to home">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-center flex-grow">Leaderboard</h1>
      </div>

      <div className="flex justify-center mb-6">
        <div className="flex border-b border-gray-300">
          {['All', 'Day', 'Week', 'Month'].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 ${activeFilter === filter ? 'border-b-2 border-black font-medium' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 space-y-3">
          {leaderboard.length > 0 ? (
            leaderboard.map((user, index) => (
              <div key={user._id || index} className="flex items-center justify-between bg-gray-200 rounded-lg p-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-400 rounded-full mr-3 flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{user._id || 'Anonymous'}</div>
                  </div>
                </div>
                <div className="font-medium">{user.totalPoints} points</div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">No donations yet.</div>
          )}
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center border border-blue-400 rounded-lg p-4">
          <img src={Trophy} alt="Trophy illustration" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
}
