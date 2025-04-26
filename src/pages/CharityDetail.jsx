import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CharityImageTemp from '../assets/charity.png';

// Sample charity data - in a real app, you would fetch this from an API
const charities = [
  {
    id: 1,
    name: "World Health Fund",
    imageSrc: CharityImageTemp,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
    ongoingCharities: [
      {
        id: 101,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 600,
        goal: 1000
      },
      {
        id: 102,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 750,
        goal: 1000
      }
    ]
  },
  {
    id: 2,
    name: "Education For All",
    imageSrc: CharityImageTemp,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
    ongoingCharities: [
      {
        id: 201,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 400,
        goal: 1000
      },
      {
        id: 202,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 850,
        goal: 1000
      }
    ]
  },
  {
    id: 3,
    name: "Clean Water Project",
    imageSrc: CharityImageTemp,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
    ongoingCharities: [
      {
        id: 301,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 300,
        goal: 1000
      },
      {
        id: 302,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 500,
        goal: 1000
      }
    ]
  },
  {
    id: 4,
    name: "Animal Rescue League",
    imageSrc: CharityImageTemp,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
    ongoingCharities: [
      {
        id: 401,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 700,
        goal: 1000
      },
      {
        id: 402,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 900,
        goal: 1000
      }
    ]
  },
  {
    id: 5,
    name: "Hunger Relief Network",
    imageSrc: CharityImageTemp,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
    ongoingCharities: [
      {
        id: 501,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 350,
        goal: 1000
      },
      {
        id: 502,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 800,
        goal: 1000
      }
    ]
  },
  {
    id: 6,
    name: "Climate Action Now",
    imageSrc: CharityImageTemp,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
    ongoingCharities: [
      {
        id: 601,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 450,
        goal: 1000
      },
      {
        id: 602,
        name: "Organization Name",
        imageSrc: CharityImageTemp,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        raised: 650,
        goal: 1000
      }
    ]
  }
];

const CharityDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [charity, setCharity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with timeout
    const fetchCharity = () => {
      setLoading(true);
      setTimeout(() => {
        const foundCharity = charities.find(c => c.id === parseInt(id));
        setCharity(foundCharity || null);
        setLoading(false);
      }, 300);
    };

    fetchCharity();
  }, [id]);

  const handleBack = () => {
    navigate('/category');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3276A6E5] mx-auto"></div>
          <p className="mt-4 text-black">Loading charity information...</p>
        </div>
      </div>
    );
  }

  if (!charity) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBack}
            className="text-black hover:text-[#3276A6E5] mr-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-black">Charity Not Found</h1>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-black mb-4">The charity you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={handleBack}
            className="px-4 py-2 bg-[#3276A6E5] text-white rounded hover:bg-[#3276A6E5]/80"
          >
            Return to Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with back button */}
      <div className="flex items-center mb-6">
        <button 
          onClick={handleBack}
          className="text-black hover:text-[#3276A6E5] mr-4"
          aria-label="Go back to category page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-black">{charity.name} <span className="inline-block ml-2 text-[#3276A6E5]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </span></h1>
      </div>
      
      {/* Main charity info */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/3 flex-shrink-0">
          <div className="bg-white rounded-lg p-6 flex justify-center items-center">
            <img 
              src={charity.imageSrc} 
              alt={`${charity.name} logo`} 
              className="max-w-full h-auto max-h-64"
              onError={(e) => {
                e.target.src = '/assets/charity.png';
              }}
            />
          </div>
        </div>
        
        <div className="w-full md:w-2/3">
          <div className="flex flex-col h-full">
            <div className="flex-grow">
              <p className="text-black mb-6">{charity.description}</p>
            </div>
            <div>
              <button className="w-full bg-[#3276A6E5] text-white py-3 px-6 rounded hover:bg-[#3276A6E5]/80 transition-colors">
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ongoing charities section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-black">Ongoing charities</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {charity.ongoingCharities.map(org => (
            <div key={org.id} className="bg-blue-100 rounded-lg p-6">
              <div className="bg-white rounded-lg mb-4 p-4 flex justify-center items-center">
                <img 
                  src={org.imageSrc} 
                  alt={`${org.name} logo`}
                  className="max-w-full h-auto max-h-40"
                  onError={(e) => {
                    e.target.src = '/assets/charity.png';
                  }}
                />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-center text-black">{org.name}</h3>
              
              <p className="text-black mb-6">{org.description}</p>
              
              <div className="mb-3">
                <div className="relative group">
                  <div className="w-full bg-blue-100 rounded-full h-2.5">
                    <div 
                      className="bg-black h-2.5 rounded-full" 
                      style={{ width: `${(org.raised / org.goal) * 100}%` }}
                    ></div>
                  </div>
                  {/* Tooltip for raised amount on hover */}
                  <div className="absolute left-0 top-[-30px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="bg-gray-800 text-white text-xs rounded py-1 px-2">
                      ${org.raised}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-black">
                    ${org.goal}
                  </span>
                  <button className="bg-white border border-black text-black w-20 h-8 rounded-full hover:bg-gray-100 transition-colors text-sm">
                    Donate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharityDetailPage;