import React, { useRef } from 'react';
import ProjectCard from '../components/ProjectCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import sampleImage from "../assets/galleryImage.png";

const trustFundProjects = [
  { id: 1, image: sampleImage, alt: "TrustFund Project 1" },
  { id: 2, image: sampleImage, alt: "TrustFund Project 2" },
  { id: 3, image: sampleImage, alt: "TrustFund Project 3" },
  { id: 4, image: sampleImage, alt: "TrustFund Project 4" },
  { id: 5, image: sampleImage, alt: "TrustFund Project 5" },
  { id: 6, image: sampleImage, alt: "TrustFund Project 6" },
];

const organizationsProjects = [
  { id: 1, image: sampleImage, alt: "Organization Project 1" },
  { id: 2, image: sampleImage, alt: "Organization Project 2" },
  { id: 3, image: sampleImage, alt: "Organization Project 3" },
  { id: 4, image: sampleImage, alt: "Organization Project 4" },
  { id: 5, image: sampleImage, alt: "Organization Project 5" },
  { id: 6, image: sampleImage, alt: "Organization Project 6" },
];

const GalleryPage = () => {
  const trustFundSliderRef = useRef(null);
  const orgSliderRef = useRef(null);

  const scroll = (sliderRef, direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* TrustFund Projects Section */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-4">TrustFund Projects</h2>
        
        <div className="relative">
          {/* Left navigation button */}
          <button 
            onClick={() => scroll(trustFundSliderRef, 'left')}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          
          {/* Horizontal scrollable container */}
          <div 
            ref={trustFundSliderRef}
            className="flex overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {trustFundProjects.map(project => (
              <ProjectCard 
                key={project.id} 
                image={project.image} 
                alt={project.alt}
              />
            ))}
          </div>
          
          {/* Right navigation button */}
          <button 
            onClick={() => scroll(trustFundSliderRef, 'right')}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>
      
      {/* Organizations Projects Section */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-4">Organizations Projects</h2>
        
        <div className="relative">
          {/* Left navigation button */}
          <button 
            onClick={() => scroll(orgSliderRef, 'left')}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          
          {/* Horizontal scrollable container */}
          <div 
            ref={orgSliderRef}
            className="flex overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {organizationsProjects.map(project => (
              <ProjectCard 
                key={project.id} 
                image={project.image} 
                alt={project.alt}
              />
            ))}
          </div>
          
          {/* Right navigation button */}
          <button 
            onClick={() => scroll(orgSliderRef, 'right')}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;