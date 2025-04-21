import { useState } from 'react';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="bg-white rounded-full p-1 w-16 h-16 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-8 h-8 border-2 border-black rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 flex items-center justify-center">
                  <span className="text-xs font-bold">✓</span>
                </div>
              </div>
              <div className="text-black text-xs font-bold mt-1">Trust</div>
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-white font-medium">
          <a href="#" className="hover:text-gray-200">Home</a>
          <a href="#" className="hover:text-gray-200">Category</a>
          <a href="#" className="hover:text-gray-200">Gallery</a>
          <a href="#" className="hover:text-gray-200">About</a>
          <a href="#" className="hover:text-gray-200">Feedback</a>
        </div>

        {/* Create Account Button */}
        <div className="hidden md:block">
          <button className="bg-white text-black font-medium py-2 px-6 rounded-full hover:bg-gray-100">
            create account
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-500 pt-2 pb-4">
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