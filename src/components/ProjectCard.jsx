import React from 'react';

const ProjectCard = ({ image, alt, className }) => {
    return (
      <div className={`flex-shrink-0 w-[280px] snap-start ${className}`}>
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

export default ProjectCard;