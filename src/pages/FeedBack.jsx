import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export default function FeedbackSystem() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isAddingFeedback, setIsAddingFeedback] = useState(false);
  const [newFeedback, setNewFeedback] = useState('');
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:5000/api'; // adjust as needed

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch(`${API_URL}/feedbacks`);
        const data = await res.json();
        setFeedbacks(data);
      } catch (err) {
        console.error('Error fetching feedbacks:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleSubmitFeedback = async () => {
    if (newFeedback.trim() !== '') {
      try {
        const res = await fetch(`${API_URL}/feedbacks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: newFeedback }),
        });
        const data = await res.json();
        setFeedbacks([data, ...feedbacks]); // add new feedback on top
        setNewFeedback('');
        setIsAddingFeedback(false);
      } catch (err) {
        console.error('Error submitting feedback:', err);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-black">
      <Helmet>
        <title>Feedback System</title>
      </Helmet>
      {isAddingFeedback ? (
        <AddFeedbackView
          newFeedback={newFeedback}
          setNewFeedback={setNewFeedback}
          handleSubmit={handleSubmitFeedback}
          handleBack={() => setIsAddingFeedback(false)}
        />
      ) : (
        <FeedbackListView
          feedbacks={feedbacks}
          handleAddClick={() => setIsAddingFeedback(true)}
          loading={loading}
        />
      )}
    </div>
  );
}

function FeedbackListView({ feedbacks, handleAddClick, loading }) {
  return (
    <div className="text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Feedback</h1>
        <button
          onClick={handleAddClick}
          className="bg-blue-500 text-white p-2 rounded-md"
          aria-label="Add feedback"
        >
          <PlusIcon />
        </button>
      </div>

      {loading ? (
        <p>Loading feedbacks...</p>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((feedback) => (
            <div key={feedback._id} className="p-4 bg-gray-200 rounded-lg">
              {feedback.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddFeedbackView({ newFeedback, setNewFeedback, handleSubmit, handleBack }) {
  return (
    <div>
      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="mr-4" aria-label="Go back">
          <ChevronLeftIcon />
        </button>
        <h1 className="text-2xl font-bold">Adding Feedback</h1>
      </div>

      <textarea
        value={newFeedback}
        onChange={(e) => setNewFeedback(e.target.value)}
        className="w-full h-32 p-4 bg-gray-200 rounded-lg mb-6 resize-none"
        placeholder="Enter your feedback here..."
      />

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  );
}
