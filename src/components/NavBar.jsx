import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import LogoImage from '../assets/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine which navigation menu to show based on the current path
  const getNavType = () => {
    const path = location.pathname;
    if (path.startsWith('/admin')) {
      return 'admin';
    } else if (path.startsWith('/org')) {
      return 'organization';
    }
    return 'regular';
  };
  
  const navType = getNavType();
  
  useEffect(() => {
    const path = location.pathname;
    // Extract the current page from the path
    let currentPage;
    
    if (path === '/') {
      currentPage = 'home';
    } else if (path === '/admin' || path === '/admin/') {
      currentPage = 'dashboard';
    } else if (path.startsWith('/admin/')) {
      currentPage = path.substring(7); // Remove '/admin/'
    } else if (path === '/org' || path === '/org/') {
      currentPage = 'donations';
    } else if (path.startsWith('/org/')) {
      currentPage = path.substring(5); // Remove '/org/'
    } else {
      currentPage = path.substring(1); // Remove leading '/'
    }
    
    setActivePage(currentPage);
  }, [location]);
  
  // Get appropriate navigation links based on user type
  const getNavLinks = () => {
    switch (navType) {
      case 'admin':
        return [
          { name: 'dashboard', path: '/admin/dashboard', label: 'Dashboard' },
          { name: 'organizations', path: '/admin/organizations', label: 'Organizations' },
          { name: 'donors', path: '/admin/donors', label: 'Donors' },
          { name: 'gallery', path: '/admin/gallery', label: 'Gallery' }
        ];
      case 'organization':
        return [
          { name: 'donations', path: '/org/donations', label: 'Donations' },
          { name: 'chats', path: '/org/chats', label: 'Chats' },
          { name: 'post', path: '/org/post', label: 'Post' }
        ];
      default:
        return [
          { name: 'home', path: '/', label: 'Home' },
          { name: 'category', path: '/category', label: 'Category' },
          { name: 'gallery', path: '/gallery', label: 'Gallery' },
          { name: 'about', path: '/about', label: 'About' },
          { name: 'feedback', path: '/feedback', label: 'Feedback' }
        ];
    }
  };
  
  const navLinks = getNavLinks();
  
  const handleNavClick = (page) => {
    setActivePage(page);
    setIsMenuOpen(false);
  };

  const handleSignupClick = () => {
    navigate('/signup');
    setIsMenuOpen(false);
  };

  const isActive = (page) => activePage === page;
  
  // Show account button only for regular users
  const showAccountButton = navType === 'regular';
  
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

        {/* Desktop Navigation Menu */}
        {navType === 'regular' ? (
          <div className="hidden md:flex space-x-8 text-black font-medium">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.path} 
                onClick={() => handleNavClick(link.name)}
                className={`hover:text-gray-200 transition-colors ${isActive(link.name) ? 'font-bold text-black border-b-2 border-black pb-1' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : (
          <div className="hidden md:flex space-x-8 text-black font-medium mx-auto">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.path} 
                onClick={() => handleNavClick(link.name)}
                className={`hover:text-gray-200 transition-colors ${isActive(link.name) ? 'font-bold text-black border-b-2 border-black pb-1' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Create Account Button (only for regular users) */}
        {showAccountButton && (
          <div className="hidden md:block">
            <button 
              onClick={handleSignupClick}
              className="bg-white text-black font-medium py-2 px-6 rounded-full hover:bg-gray-100"
            >
              create account
            </button>
          </div>
        )}
        
        {/* Empty div for admin/org navbar to maintain spacing */}
        {navType !== 'regular' && <div className="hidden md:block"></div>}

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

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-500 pt-2 pb-4 absolute w-full z-10">
          <div className={`flex flex-col space-y-3 px-4 text-white ${navType !== 'regular' ? 'items-center' : ''}`}>
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.path} 
                onClick={() => handleNavClick(link.name)}
                className={`py-2 hover:bg-blue-600 px-2 rounded ${isActive(link.name) ? 'font-bold text-black bg-blue-300 border-b-2 border-black' : ''}`}
              >
                {link.label}
              </a>
            ))}
            
            {/* Mobile Create Account Button (only for regular users) */}
            {showAccountButton && (
              <button 
                onClick={handleSignupClick}
                className="bg-white text-black font-medium py-2 px-6 rounded-full hover:bg-gray-100 self-start"
              >
                create account
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;