import React from 'react';

const ProjectCard = ({ image, alt }) => {
  return (
    <div className="overflow-hidden h-40 w-56 mx-2">
      <img 
        src={image} 
        alt={alt || "Project image"} 
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
      />
    </div>
  );
};

export default ProjectCard;