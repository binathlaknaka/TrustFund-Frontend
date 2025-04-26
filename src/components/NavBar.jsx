import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import LogoImage from '../assets/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const path = location.pathname;
    const currentPage = path === '/' ? 'home' : path.substring(1);
    setActivePage(currentPage);
  }, [location]);
  
  const handleNavClick = (page) => {
    setActivePage(page);
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const isActive = (page) => activePage === page;
  
  return (
    <nav style={{ backgroundColor: '#3276A6E5' }} className="shadow-md">
      <div className="h-16 md:h-20 container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <img 
            src={LogoImage} 
            alt="TrustFund Logo" 
            className="h-fit max-h-12 md:max-h-16"
          />
        </div>

        <div className="hidden md:flex space-x-8 text-black font-medium">
          <a 
            href="/" 
            onClick={() => handleNavClick('home')}
            className={`hover:text-gray-200 transition-colors ${isActive('home') ? 'font-bold text-black border-b-2 border-black pb-1' : ''}`}
          >
            Home
          </a>
          <a 
            href="/category" 
            onClick={() => handleNavClick('category')}
            className={`hover:text-gray-200 transition-colors ${isActive('category') ? 'font-bold text-black border-b-2 border-black pb-1' : ''}`}
          >
            Category
          </a>
          <a 
            href="/gallery" 
            onClick={() => handleNavClick('gallery')}
            className={`hover:text-gray-200 transition-colors ${isActive('gallery') ? 'font-bold text-black border-b-2 border-black pb-1' : ''}`}
          >
            Gallery
          </a>
          <a 
            href="/about" 
            onClick={() => handleNavClick('about')}
            className={`hover:text-gray-200 transition-colors ${isActive('about') ? 'font-bold text-black border-b-2 border-black pb-1' : ''}`}
          >
            About
          </a>
          <a 
            href="/feedback" 
            onClick={() => handleNavClick('feedback')}
            className={`hover:text-gray-200 transition-colors ${isActive('feedback') ? 'font-bold text-black border-b-2 border-black pb-1' : ''}`}
          >
            Feedback
          </a>
        </div>

        <div className="hidden md:block">
          <button 
            onClick={handleSignupClick}
            className="bg-white text-black font-medium py-2 px-6 rounded-full hover:bg-gray-100"
          >
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
            <a 
              href="/" 
              onClick={() => handleNavClick('home')}
              className={`py-2 hover:bg-blue-600 px-2 rounded ${isActive('home') ? 'font-bold text-black bg-blue-300 border-b-2 border-black' : ''}`}
            >
              Home
            </a>
            <a 
              href="/category" 
              onClick={() => handleNavClick('category')}
              className={`py-2 hover:bg-blue-600 px-2 rounded ${isActive('category') ? 'font-bold text-black bg-blue-300 border-b-2 border-black' : ''}`}
            >
              Category
            </a>
            <a 
              href="/gallery" 
              onClick={() => handleNavClick('gallery')}
              className={`py-2 hover:bg-blue-600 px-2 rounded ${isActive('gallery') ? 'font-bold text-black bg-blue-300 border-b-2 border-black' : ''}`}
            >
              Gallery
            </a>
            <a 
              href="/about" 
              onClick={() => handleNavClick('about')}
              className={`py-2 hover:bg-blue-600 px-2 rounded ${isActive('about') ? 'font-bold text-black bg-blue-300 border-b-2 border-black' : ''}`}
            >
              About
            </a>
            <a 
              href="/feedback" 
              onClick={() => handleNavClick('feedback')}
              className={`py-2 hover:bg-blue-600 px-2 rounded ${isActive('feedback') ? 'font-bold text-black bg-blue-300 border-b-2 border-black' : ''}`}
            >
              Feedback
            </a>
            <button 
              onClick={handleSignupClick}
              className="bg-white text-black font-medium py-2 px-6 rounded-full hover:bg-gray-100 self-start"
            >
              create account
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;