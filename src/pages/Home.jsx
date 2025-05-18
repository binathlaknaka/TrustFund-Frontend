import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import CharityCard from '../components/CharityCard';
import homeTemp from '../assets/homeTemp.png';
import Leaderboard from '../assets/Leaderboard.png';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [charities, setCharities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   const fetchSlides = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/gallery/home-slides');
      const data = await res.json();
      console.log('[slides fetched]', data); // 🔍 Add this
      setSlides(data);
    } catch (err) {
      console.error('[Slide fetch error]', err);
    }
  };

    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/posts');
        const data = await res.json();
        setCharities(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };

    fetchSlides();
    fetchPosts();
  }, []);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % (slides.length || 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [slides]);

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

      {/* Hero Carousel Section */}
      <div className="relative mx-64 my-12 rounded-lg overflow-hidden">
        <div className="flex place-content-center overflow-hidden relative h-[400px]">
          {slides.length > 0 ? (
            <img
              src={`http://localhost:5000/uploads/HomeSlide/${slides[currentSlide]}`}
              alt={`Slide ${currentSlide + 1}`}
              className="object-cover w-full h-full"
            />
          ) : (
            <img
              src={homeTemp}
              alt="Default Slide"
              className="object-cover w-full h-full"
            />
          )}

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
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 w-2 mx-1 rounded-full ${
                currentSlide === index ? 'bg-black' : 'bg-gray-300'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

{/* Blue Divider */}
<div  className="w-full h-20 my-4 flex items-center justify-center">
  <text style={{ color: '#3276A6E5' }} className="text-white text-4xl font-bold mb-10">Ongoing Charity Programs</text>
</div>


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
              raised={charity.raised || 0}
              imageUrl={`http://localhost:5000/uploads/${charity.image}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
