import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import sampleImage from "../assets/galleryImage.png";

// ProjectCard Component
const ProjectCard = ({ image, alt }) => {
  return (
    <div className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
      <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        <img 
          src={image} 
          alt={alt} 
          className="w-full h-48 object-cover"
        />
      </div>
    </div>
  );
};

const GalleryPage = () => {
  // State for projects with infinite scrolling
  const [trustFundProjects, setTrustFundProjects] = useState([
    { id: 1, image: sampleImage, alt: "TrustFund Project 1" },
    { id: 2, image: sampleImage, alt: "TrustFund Project 2" },
    { id: 3, image: sampleImage, alt: "TrustFund Project 3" },
    { id: 4, image: sampleImage, alt: "TrustFund Project 4" },
    { id: 5, image: sampleImage, alt: "TrustFund Project 5" },
    { id: 6, image: sampleImage, alt: "TrustFund Project 6" },
  ]);

  const [organizationsProjects, setOrganizationsProjects] = useState([
    { id: 1, image: sampleImage, alt: "Organization Project 1" },
    { id: 2, image: sampleImage, alt: "Organization Project 2" },
    { id: 3, image: sampleImage, alt: "Organization Project 3" },
    { id: 4, image: sampleImage, alt: "Organization Project 4" },
    { id: 5, image: sampleImage, alt: "Organization Project 5" },
    { id: 6, image: sampleImage, alt: "Organization Project 6" },
  ]);

  const trustFundSliderRef = useRef(null);
  const orgSliderRef = useRef(null);
  
  // Function to handle scrolling
  const scroll = (sliderRef, direction) => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const cardWidth = container.querySelector('div').offsetWidth;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      
      // Current scroll position
      const currentScroll = container.scrollLeft;
      // Target scroll position
      const targetScroll = currentScroll + scrollAmount;
      
      container.scrollTo({ left: targetScroll, behavior: 'smooth' });
      
      // Implement infinite scrolling
      if (direction === 'right' && 
          container.scrollLeft + container.clientWidth >= container.scrollWidth - cardWidth) {
        // If we're near the end, add more items
        if (sliderRef === trustFundSliderRef) {
          addMoreTrustFundProjects();
        } else {
          addMoreOrganizationsProjects();
        }
      }
    }
  };
  
  // Function to add more TrustFund projects
  const addMoreTrustFundProjects = () => {
    const lastId = trustFundProjects[trustFundProjects.length - 1].id;
    const newProjects = Array(4).fill().map((_, index) => ({
      id: lastId + index + 1,
      image: sampleImage,
      alt: `TrustFund Project ${lastId + index + 1}`
    }));
    
    setTrustFundProjects(prev => [...prev, ...newProjects]);
  };
  
  // Function to add more Organizations projects
  const addMoreOrganizationsProjects = () => {
    const lastId = organizationsProjects[organizationsProjects.length - 1].id;
    const newProjects = Array(4).fill().map((_, index) => ({
      id: lastId + index + 1,
      image: sampleImage,
      alt: `Organization Project ${lastId + index + 1}`
    }));
    
    setOrganizationsProjects(prev => [...prev, ...newProjects]);
  };
  
  // Check if we need to add scroll detection
  useEffect(() => {
    const handleScroll = (ref, addMoreFn) => {
      if (!ref.current) return;
      
      const container = ref.current;
      // If we're close to the end (within 100px)
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 100) {
        addMoreFn();
      }
    };
    
    const trustFundContainer = trustFundSliderRef.current;
    const orgContainer = orgSliderRef.current;
    
    if (trustFundContainer) {
      trustFundContainer.addEventListener('scroll', () => handleScroll(trustFundSliderRef, addMoreTrustFundProjects));
    }
    
    if (orgContainer) {
      orgContainer.addEventListener('scroll', () => handleScroll(orgSliderRef, addMoreOrganizationsProjects));
    }
    
    return () => {
      if (trustFundContainer) {
        trustFundContainer.removeEventListener('scroll', () => handleScroll(trustFundSliderRef, addMoreTrustFundProjects));
      }
      
      if (orgContainer) {
        orgContainer.removeEventListener('scroll', () => handleScroll(orgSliderRef, addMoreOrganizationsProjects));
      }
    };
  }, [trustFundProjects, organizationsProjects]);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* TrustFund Projects Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-blue-500 pl-3">
            TrustFund Projects
          </h2>
          
          <div className="relative">
            {/* Left navigation button */}
            <button 
              onClick={() => scroll(trustFundSliderRef, 'left')}
              className="absolute top-1/2 -left-4 md:left-0 transform -translate-y-1/2 z-10 bg-white text-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 focus:outline-none"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            
            {/* Scrollable container */}
            <div 
              ref={trustFundSliderRef}
              className="flex overflow-x-auto pb-6 pt-2 snap-x snap-mandatory hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex w-full">
                {trustFundProjects.map(project => (
                  <div key={project.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 snap-start px-2">
                    <ProjectCard 
                      image={project.image} 
                      alt={project.alt}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right navigation button */}
            <button 
              onClick={() => scroll(trustFundSliderRef, 'right')}
              className="absolute top-1/2 -right-4 md:right-0 transform -translate-y-1/2 z-10 bg-white text-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 focus:outline-none"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </section>
        
        {/* Organizations Projects Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-green-500 pl-3">
            Organizations Projects
          </h2>
          
          <div className="relative">
            {/* Left navigation button */}
            <button 
              onClick={() => scroll(orgSliderRef, 'left')}
              className="absolute top-1/2 -left-4 md:left-0 transform -translate-y-1/2 z-10 bg-white text-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 focus:outline-none"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            
            {/* Scrollable container */}
            <div 
              ref={orgSliderRef}
              className="flex overflow-x-auto pb-6 pt-2 snap-x snap-mandatory hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex w-full">
                {organizationsProjects.map(project => (
                  <div key={project.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 snap-start px-2">
                    <ProjectCard 
                      image={project.image} 
                      alt={project.alt}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right navigation button */}
            <button 
              onClick={() => scroll(orgSliderRef, 'right')}
              className="absolute top-1/2 -right-4 md:right-0 transform -translate-y-1/2 z-10 bg-white text-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 focus:outline-none"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GalleryPage;