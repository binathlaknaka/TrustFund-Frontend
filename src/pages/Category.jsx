import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CharityCard from '../components/CharityCardCategory';
import CharityImageTemp from '../assets/charity.png';

const defaultCharities = [
  {
    id: 1,
    name: "World Health Fund",
    imageSrc: CharityImageTemp,
    description: "Supporting global healthcare initiatives and emergency medical services."
  },
  {
    id: 2,
    name: "Education For All",
    imageSrc: CharityImageTemp,
    description: "Providing educational resources to underprivileged communities worldwide."
  },
  {
    id: 3,
    name: "Clean Water Project",
    imageSrc: CharityImageTemp,
    description: "Bringing clean drinking water to regions facing water scarcity and pollution."
  },
  {
    id: 4,
    name: "Animal Rescue League",
    imageSrc: CharityImageTemp,
    description: "Rescuing and rehabilitating endangered and abused animals across the globe."
  },
  {
    id: 5,
    name: "Hunger Relief Network",
    imageSrc: CharityImageTemp,
    description: "Fighting food insecurity through community programs and food banks."
  },
  {
    id: 6,
    name: "Climate Action Now",
    imageSrc: CharityImageTemp,
    description: "Working towards sustainable solutions to combat climate change."
  }
];

const OrganizationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [charities, setCharities] = useState(defaultCharities);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm === '') {
      setCharities(defaultCharities);
      return;
    }

    const filteredResults = defaultCharities.filter(
      charity =>
        charity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        charity.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCharities(filteredResults);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Category</title>
      </Helmet>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0 text-black">Organizations</h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full md:w-auto md:max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search organizations..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3276A6E5] text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black hover:text-[#3276A6E5]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Category Filters */}
      <div className="mb-8">
        <div className="flex overflow-x-auto gap-3 pb-2 md:flex-wrap md:overflow-x-visible">
          <button className="px-4 py-2 bg-[#3276A6E5] text-white rounded-full hover:bg-[#3276A6E5]/80 flex-shrink-0">
            All
          </button>
          <button className="px-4 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 flex-shrink-0">
            Health
          </button>
          <button className="px-4 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 flex-shrink-0">
            Education
          </button>
          <button className="px-4 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 flex-shrink-0">
            Environment
          </button>
          <button className="px-4 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 flex-shrink-0">
            Animals
          </button>
          <button className="px-4 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 flex-shrink-0">
            Humanitarian
          </button>
        </div>
      </div>

      {/* Charity Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {charities.length > 0 ? (
          charities.map(charity => (
            <CharityCard
              key={charity.id}
              id={charity.id}
              name={charity.name}
              imageSrc={charity.imageSrc}
              description={charity.description}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-medium text-black">No organizations found matching your search.</h3>
            <button
              onClick={() => setCharities(defaultCharities)}
              className="mt-4 px-4 py-2 bg-[#3276A6E5] text-white rounded hover:bg-[#3276A6E5]/80"
            >
              View All Organizations
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {/* <div className="mt-12 flex justify-center">
        <nav className="flex items-center space-x-2">
          <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 text-black">
            «
          </button>
          <button className="px-3 py-1 rounded bg-[#3276A6E5] text-white">1</button>
          <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 text-black">
            2
          </button>
          <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 text-black">
            3
          </button>
          <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 text-black">
            »
          </button>
        </nav>
      </div> */}
    </div>
  );
};

export default OrganizationsPage;