import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import CharityCard from '../components/CharityCard';
import homeTemp from '../assets/homeTemp.png';
import Leaderboard from '../assets/Leaderboard.png';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [charities, setCharities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/posts');
        const data = await res.json();
        setCharities(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, []);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const goToLeaderboard = () => {
    navigate('/leaderboard');
  };

  return (
    <div id="top" className="flex flex-col min-h-screen">
      <Helmet>
        <title>Home</title>
      </Helmet>

      {/* Hero Banner Section */}
      <div className="relative mx-4 my-4 rounded-lg overflow-hidden">
        <div className="flex place-content-center overflow-hidden relative">
          <img src={homeTemp} alt="Charity volunteers" />
          <button 
            onClick={goToLeaderboard}
            className="absolute top-2 right-2 bg-white p-2 rounded shadow flex items-center justify-center"
            style={{ backgroundColor: '#3276a6' }}
            aria-label="View Leaderboard"
          >
            <img src={Leaderboard} alt="leaderboard stats" className="h-12" />
          </button>
        </div>
        <div className="flex justify-center mt-2">
          {[0, 1, 2, 3].map((dot, index) => (
            <button 
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 w-2 mx-1 rounded-full ${currentSlide === index ? 'bg-black' : 'bg-gray-300'}`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Blue Divider */}
      <div style={{ backgroundColor: '#3276A6E5' }} className="w-full h-20 my-4"></div>

      {/* Charity Cards Grid */}
      <div className="container mx-auto px-4 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {charities.map((charity) => (
          <CharityCard 
          key={charity._id}
          id={charity._id}  
          name={charity.programName}
          description={charity.programDescription}
          amount={charity.goal}
          raised={charity.raised || 0}  // pass raised amount here!
          imageUrl={`http://localhost:5000/uploads/${charity.image}`}
        />
        
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
