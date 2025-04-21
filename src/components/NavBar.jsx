import { useState } from 'react';
import { Menu } from 'lucide-react';
import LogoImage from '../assets/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-500 shadow-md">
      <div className="h-16 md:h-20 container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <img 
            src={LogoImage} 
            alt="TrustFund Logo" 
            className="h-fit max-h-12 md:max-h-16"
          />
        </div>

        
        <div className="hidden md:flex space-x-8 text-black font-medium">
          <a href="#" className="hover:text-gray-200">Home</a>
          <a href="#" className="hover:text-gray-200">Category</a>
          <a href="#" className="hover:text-gray-200">Gallery</a>
          <a href="#" className="hover:text-gray-200">About</a>
          <a href="#" className="hover:text-gray-200">Feedback</a>
        </div>

        <div className="hidden md:block">
          <button className="bg-white text-black font-medium py-2 px-6 rounded-full hover:bg-gray-100">
            create account
          </button>
        </div>

        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-blue-500 pt-2 pb-4 absolute w-full z-10">
          <div className="flex flex-col space-y-3 px-4 text-white">
            <a href="#" className="py-2 hover:bg-blue-600 px-2 rounded">Home</a>
            <a href="#" className="py-2 hover:bg-blue-600 px-2 rounded">Category</a>
            <a href="#" className="py-2 hover:bg-blue-600 px-2 rounded">Gallery</a>
            <a href="#" className="py-2 hover:bg-blue-600 px-2 rounded">About</a>
            <a href="#" className="py-2 hover:bg-blue-600 px-2 rounded">Feedback</a>
            <button className="bg-white text-black font-medium py-2 px-6 rounded-full hover:bg-gray-100 self-start">
              create account
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;