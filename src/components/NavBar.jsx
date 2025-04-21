import { useState } from 'react';
import { Menu } from 'lucide-react';
import LogoImage from '../assets/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav style={{ backgroundColor: '#3276A6E5' }} class="shadow-md">
      <div class="h-16 md:h-20 container mx-auto flex items-center justify-between px-4">
        <div class="flex items-center">
          <img 
            src={LogoImage} 
            alt="TrustFund Logo" 
            class="h-fit max-h-12 md:max-h-16"
          />
        </div>

        
        <div class="hidden md:flex space-x-8 text-black font-medium">
          <a href="#" class="hover:text-gray-200">Home</a>
          <a href="#" class="hover:text-gray-200">Category</a>
          <a href="#" class="hover:text-gray-200">Gallery</a>
          <a href="#" class="hover:text-gray-200">About</a>
          <a href="#" class="hover:text-gray-200">Feedback</a>
        </div>

        <div class="hidden md:block">
          <button class="bg-white text-black font-medium py-2 px-6 rounded-full hover:bg-gray-100">
            create account
          </button>
        </div>

        <div class="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            class="text-white focus:outline-none"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div class="md:hidden bg-blue-500 pt-2 pb-4 absolute w-full z-10">
          <div class="flex flex-col space-y-3 px-4 text-white">
            <a href="#" class="py-2 hover:bg-blue-600 px-2 rounded">Home</a>
            <a href="#" class="py-2 hover:bg-blue-600 px-2 rounded">Category</a>
            <a href="#" class="py-2 hover:bg-blue-600 px-2 rounded">Gallery</a>
            <a href="#" class="py-2 hover:bg-blue-600 px-2 rounded">About</a>
            <a href="#" class="py-2 hover:bg-blue-600 px-2 rounded">Feedback</a>
            <button class="bg-white text-black font-medium py-2 px-6 rounded-full hover:bg-gray-100 self-start">
              create account
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;