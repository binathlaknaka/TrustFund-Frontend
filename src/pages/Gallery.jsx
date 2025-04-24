import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import sampleImage from "../assets/galleryImage.png";
import ProjectCard from '../components/ProjectCard';

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
  
  // Function to add more TrustFund projects
  const addMoreTrustFundProjects = useCallback(() => {
    const lastId = trustFundProjects[trustFundProjects.length - 1].id;
    const newProjects = Array(4).fill().map((_, index) => ({
      id: lastId + index + 1,
      image: sampleImage,
      alt: `TrustFund Project ${lastId + index + 1}`
    }));
    
    setTrustFundProjects(prev => [...prev, ...newProjects]);
  }, [trustFundProjects]);
  
  // Function to add more Organizations projects
  const addMoreOrganizationsProjects = useCallback(() => {
    const lastId = organizationsProjects[organizationsProjects.length - 1].id;
    const newProjects = Array(4).fill().map((_, index) => ({
      id: lastId + index + 1,
      image: sampleImage,
      alt: `Organization Project ${lastId + index + 1}`
    }));
    
    setOrganizationsProjects(prev => [...prev, ...newProjects]);
  }, [organizationsProjects]);

  // Function to handle scrolling
  const scroll = useCallback((sliderRef, direction) => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const card = container.querySelector('.project-card');
      if (!card) return;
      
      const cardWidth = card.offsetWidth;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);
  
  // Check if we need to add scroll detection
  useEffect(() => {
    const handleScroll = (ref, addMoreFn) => {
      if (!ref.current) return;
      
      const container = ref.current;
      // If we're close to the end (within 2 card widths)
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - (container.clientWidth * 0.5)) {
        addMoreFn();
      }
    };
    
    const trustFundContainer = trustFundSliderRef.current;
    const orgContainer = orgSliderRef.current;
    
    const trustFundHandler = () => handleScroll(trustFundSliderRef, addMoreTrustFundProjects);
    const orgHandler = () => handleScroll(orgSliderRef, addMoreOrganizationsProjects);
    
    if (trustFundContainer) {
      trustFundContainer.addEventListener('scroll', trustFundHandler);
    }
    
    if (orgContainer) {
      orgContainer.addEventListener('scroll', orgHandler);
    }
    
    return () => {
      if (trustFundContainer) {
        trustFundContainer.removeEventListener('scroll', trustFundHandler);
      }
      
      if (orgContainer) {
        orgContainer.removeEventListener('scroll', orgHandler);
      }
    };
  }, [addMoreTrustFundProjects, addMoreOrganizationsProjects]);

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
              className="flex overflow-x-auto pb-6 pt-2 snap-x snap-mandatory hide-scrollbar gap-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {trustFundProjects.map(project => (
                <ProjectCard 
                  key={project.id}
                  image={project.image} 
                  alt={project.alt}
                  className="project-card"
                />
              ))}
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
              className="flex overflow-x-auto pb-6 pt-2 snap-x snap-mandatory hide-scrollbar gap-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {organizationsProjects.map(project => (
                <ProjectCard 
                  key={project.id}
                  image={project.image} 
                  alt={project.alt}
                  className="project-card"
                />
              ))}
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