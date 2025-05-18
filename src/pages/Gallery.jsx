import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';

const API_URL = 'http://localhost:5000/api/gallery';

const GalleryPage = () => {
  const [galleryData, setGalleryData] = useState({});
  const sliderRefs = useRef({});

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        const grouped = data.reduce((acc, item) => {
          if (!acc[item.programName]) acc[item.programName] = [];
          acc[item.programName].push(item);
          return acc;
        }, {});
        setGalleryData(grouped);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      }
    };

    fetchGallery();
  }, []);

  const scroll = useCallback((programName, direction) => {
    const container = sliderRefs.current[programName];
    if (container) {
      const card = container.querySelector('.project-card');
      if (!card) return;
      const cardWidth = card.offsetWidth + 16; // add gap
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10">
      <Helmet>
        <title>Gallery</title>
      </Helmet>

      <div className="container mx-auto px-4">
        {Object.entries(galleryData).map(([programName, projects]) => (
          <section className="mb-16" key={programName}>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-blue-500 pl-4">
              {programName}
            </h2>

            <div className="relative">
              {/* Left Scroll */}
              <button
                onClick={() => scroll(programName, 'left')}
                className="absolute top-1/2 -left-5 md:-left-6 transform -translate-y-1/2 z-10 bg-white border border-gray-300 text-gray-700 rounded-full p-2 shadow-md hover:bg-blue-100 focus:outline-none"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Image Slider */}
              <div
                ref={(el) => (sliderRefs.current[programName] = el)}
                className="flex overflow-x-auto gap-4 pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide"
              >
                {projects.map(project => (
                  <div
                    key={project.id}
                    className="project-card shrink-0 w-64 h-44 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 snap-start"
                  >
                    <img
                      src={`http://localhost:5000/uploads/${project.image}`}
                      alt={project.alt || 'Project'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Right Scroll */}
              <button
                onClick={() => scroll(programName, 'right')}
                className="absolute top-1/2 -right-5 md:-right-6 transform -translate-y-1/2 z-10 bg-white border border-gray-300 text-gray-700 rounded-full p-2 shadow-md hover:bg-blue-100 focus:outline-none"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
