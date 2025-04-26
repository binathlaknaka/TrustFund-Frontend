import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CharityImageTemp from '../assets/charity.png';

const charitiesData = [
  {
    id: 1,
    name: "World Health Fund",
    imageSrc: CharityImageTemp,
    description: "Supporting global healthcare initiatives and emergency medical services.",
    longDescription:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the",
    raised: 1000,
    goal: 1000,
  },
  {
    id: 2,
    name: "Education For All",
    imageSrc: CharityImageTemp,
    description: "Providing educational resources to underprivileged communities worldwide.",
    longDescription:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the",
    raised: 1000,
    goal: 1000,
  },
  {
    id: 3,
    name: "Clean Water Project",
    imageSrc: CharityImageTemp,
    description: "Bringing clean drinking water to regions facing water scarcity and pollution.",
    longDescription:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the",
    raised: 1000,
    goal: 1000,
  },
  {
    id: 4,
    name: "Animal Rescue League",
    imageSrc: CharityImageTemp,
    description: "Rescuing and rehabilitating endangered and abused animals across the globe.",
    longDescription:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the",
    raised: 1000,
    goal: 1000,
  },
  {
    id: 5,
    name: "Hunger Relief Network",
    imageSrc: CharityImageTemp,
    description: "Fighting food insecurity through community programs and food banks.",
    longDescription:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the",
    raised: 1000,
    goal: 1000,
  },
  {
    id: 6,
    name: "Climate Action Now",
    imageSrc: CharityImageTemp,
    description: "Working towards sustainable solutions to combat climate change.",
    longDescription:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the",
    raised: 1000,
    goal: 1000,
  },
];

const CharityDetail = () => {
  const { id } = useParams(); // Get the charity ID from the URL
  const navigate = useNavigate();

  // Find the charity based on the ID
  const charity = charitiesData.find((c) => c.id === parseInt(id));

  if (!charity) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-black">Charity Not Found</h2>
        <Link
          to="/category"
          className="mt-4 inline-block px-4 py-2 bg-[#3276A6E5] text-white rounded hover:bg-[#3276A6E5]/80"
        >
          Back to Categories
        </Link>
      </div>
    );
  }

  const handleBackClick = () => {
    navigate('/category');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="flex items-center mb-6">
        <button onClick={handleBackClick} className="mr-2 text-black hover:text-[#3276A6E5]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-black">Roo Tours</h1>
      </div>

      {/* Main Charity Section */}
      <div className="flex flex-col md:flex-row items-center mb-12">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <img
            src={charity.imageSrc}
            alt={`${charity.name} logo`}
            className="w-48 h-48 object-contain mx-auto rounded-lg border border-gray-200"
            onError={(e) => {
              e.target.src = '/assets/charity.png';
            }}
          />
          <p className="text-sm text-black text-center mt-2">
            Lorem ipsum dolor sit amet
          </p>
        </div>
        <div className="w-full md:w-2/3 md:pl-6">
          <p className="text-black mb-4">{charity.longDescription}</p>
          <button className="px-4 py-2 bg-[#3276A6E5] text-white rounded hover:bg-[#3276A6E5]/80">
            Contact
          </button>
        </div>
      </div>

      {/* Ongoing Charities Section */}
      <h2 className="text-2xl font-bold text-black mb-6">Ongoing Charities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example cards - in a real app, this would be dynamic */}
        {[charity, charity].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
          >
            <div className="p-6 flex flex-col items-center">
              <img
                src={item.imageSrc}
                alt={`${item.name} logo`}
                className="w-32 h-32 object-contain mb-4"
                onError={(e) => {
                  e.target.src = '/assets/charity.png';
                }}
              />
              <h3 className="text-xl font-bold text-black text-center mb-2">
                {item.name}
              </h3>
              <p className="text-black text-center text-sm mb-4">
                {item.description}
              </p>
              <div className="w-full mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-[#3276A6E5] h-2.5 rounded-full"
                    style={{
                      width: `${(item.raised / item.goal) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-black text-sm text-center mt-2">
                  ${item.raised} / ${item.goal}
                </p>
              </div>
              <button className="px-4 py-2 bg-[#3276A6E5] text-white rounded hover:bg-[#3276A6E5]/80">
                Donate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharityDetail;