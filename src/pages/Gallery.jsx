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

        // Group images by programName
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

      const cardWidth = card.offsetWidth;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Gallery</title>
      </Helmet>
      <div className="container mx-auto px-4">
        {Object.entries(galleryData).map(([programName, projects]) => (
          <section className="mb-12" key={programName}>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-blue-500 pl-3">
              {programName}
            </h2>

            <div className="relative">
              <button
                onClick={() => scroll(programName, 'left')}
                className="absolute top-1/2 -left-4 md:left-0 transform -translate-y-1/2 z-10 bg-white text-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 focus:outline-none"
                aria-label="Scroll left"
              >
                <ChevronLeft size={24} />
              </button>

              <div
                ref={(el) => (sliderRefs.current[programName] = el)}
                className="flex overflow-x-auto pb-6 pt-2 snap-x snap-mandatory hide-scrollbar gap-4"
              >
                {projects.map(project => (
                  <ProjectCard
                    key={project.id}
                    image={`http://localhost:5000/uploads/${project.image}`}
                    alt={project.alt}
                    className="project-card"
                  />
                ))}
              </div>

              <button
                onClick={() => scroll(programName, 'right')}
                className="absolute top-1/2 -right-4 md:right-0 transform -translate-y-1/2 z-10 bg-white text-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 focus:outline-none"
                aria-label="Scroll right"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
