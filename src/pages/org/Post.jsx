import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const PostsPage = () => {
  const posts = [
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Organization | Posts</title>
      </Helmet>
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Posted</h1>
        <Link 
          to="/org/create-post" 
          className="bg-[#3276A6] text-white p-2 rounded-md hover:bg-[#3276A6]/90"
          aria-label="Create new post"
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
              d="M12 4v16m8-8H4" 
            />
          </svg>
        </Link>
      </div>
      
      {/* Post list would go here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="border rounded-md p-4">
              {/* Post content */}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            No posts available. Create a new post by clicking the + button.
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsPage;