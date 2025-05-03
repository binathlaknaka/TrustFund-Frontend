import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const organizationEmail = storedUser?.email;

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('http://localhost:5000/api/posts');
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    post => post.organizationEmail === organizationEmail && Number(post.raised) < Number(post.goal)
  );


  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Organization | Posts</title>
      </Helmet>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Posted</h1>
        <Link to="/org/create-post" className="bg-[#3276A6] text-white p-2 rounded-md hover:bg-[#3276A6]/90">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts.length > 0 ? filteredPosts.map(post => {
          const donatedAmount = post.raised || 0;
          const goalAmount = Number(post.goal);
          const progressPercent = Math.min((donatedAmount / goalAmount) * 100, 100);

          return (
            <div key={post._id} className="border rounded-md p-4 bg-blue-50">
              <img
                src={`http://localhost:5000/uploads/${post.image}`}
                alt={post.programName}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h2 className="font-bold text-black">{post.programName}</h2>
              <p className="text-sm mb-2 text-black">{post.programDescription}</p>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1 text-black">
                  <span>Raised: ${donatedAmount}</span>
                  <span>Goal: ${goalAmount}</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

            
            </div>
          );
        }) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            No posts available. Create a new post by clicking the + button.
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsPage;
