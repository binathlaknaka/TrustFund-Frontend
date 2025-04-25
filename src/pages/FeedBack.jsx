import React, { useState } from 'react';

export default function FeedbackSystem() {
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, text: "The donation process was very straightforward. Thank you!" },
    { id: 2, text: "I love how transparent the fund allocation is on this platform." },
    { id: 3, text: "Would be great to have more payment options in the future." }
  ]);
  
  const [isAddingFeedback, setIsAddingFeedback] = useState(false);
  const [newFeedback, setNewFeedback] = useState("");
  
  const handleSubmitFeedback = () => {
    if (newFeedback.trim() !== "") {
      const newId = feedbacks.length > 0 ? Math.max(...feedbacks.map(f => f.id)) + 1 : 1;
      setFeedbacks([...feedbacks, { id: newId, text: newFeedback }]);
      setNewFeedback("");
      setIsAddingFeedback(false);
    }
  };
  
  return (
    <div class="max-w-4xl mx-auto p-6 bg-white text-black">
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
        />
      )}
    </div>
  );
}

function FeedbackListView({ feedbacks, handleAddClick }) {
  return (
    <div class="text-black">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Feedback</h1>
        <button 
          onClick={handleAddClick}
          class="bg-blue-500 text-white p-2 rounded-md"
          aria-label="Add feedback"
        >
          <PlusIcon />
        </button>
      </div>
      
      <div class="space-y-4">
        {feedbacks.map(feedback => (
          <div 
            key={feedback.id} 
            class="p-4 bg-gray-200 rounded-lg"
          >
            {feedback.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function AddFeedbackView({ newFeedback, setNewFeedback, handleSubmit, handleBack }) {
  return (
    <div>
      <div class="flex items-center mb-6">
        <button 
          onClick={handleBack} 
          class="mr-4"
          aria-label="Go back"
        >
          <ChevronLeftIcon />
        </button>
        <h1 class="text-2xl font-bold">Adding Feedback</h1>
      </div>
      
      <textarea
        value={newFeedback}
        onChange={(e) => setNewFeedback(e.target.value)}
        class="w-full h-32 p-4 bg-gray-200 rounded-lg mb-6 resize-none"
        placeholder="Enter your feedback here..."
      />
      
      <div class="flex justify-end">
        <button
          onClick={handleSubmit}
          class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 rounded-md"
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