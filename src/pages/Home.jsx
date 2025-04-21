import { useState } from 'react';
import CharityCard from '../components/CharityCard';
import homeTemp from '../assets/homeTemp.png';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Mock data for charity cards
  const charities = [
    {
      id: 1,
      name: "Organization Name",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
      amount: "1000"
    },
    {
      id: 2,
      name: "Organization Name",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
      amount: "1000"
    },
    {
      id: 3,
      name: "Organization Name",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
      amount: "1000"
    },
    {
      id: 4,
      name: "Organization Name",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
      amount: "1000"
    },
    {
      id: 5,
      name: "Organization Name",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
      amount: "1000"
    },
    {
      id: 6,
      name: "Organization Name",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
      amount: "1000"
    }
  ];

  // Function to handle slide change
  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div id="top" class="flex flex-col min-h-screen">
      {/* Hero Banner Section */}
      <div class="relative mx-4 my-4 rounded-lg overflow-hidden">
      <div class="flex place-content-center overflow-hidden relative">
        <img src={homeTemp} alt="Charity volunteers"/>
      </div>
        
        {/* Dots for carousel */}
        <div class="flex justify-center mt-2">
          {[0, 1, 2, 3].map((dot, index) => (
            <button 
              key={index}
              onClick={() => handleDotClick(index)}
              class={`h-2 w-2 mx-1 rounded-full ${currentSlide === index ? 'bg-black' : 'bg-gray-300'}`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Blue Divider */}
      <div class="w-full h-12 bg-blue-500 my-4"></div>
      
      {/* Charity Cards Grid */}
      <div class="container mx-auto px-4 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {charities.map((charity) => (
            <CharityCard 
              key={charity.id}
              name={charity.name}
              description={charity.description}
              amount={charity.amount}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;