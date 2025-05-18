import { useState, useContext, useEffect } from 'react';
import { Menu } from 'lucide-react';
import LogoImage from '../assets/TrustFundLogooo.png';
import ProfileImage from '../assets/profile.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (user && user.name) {
      setCurrentUser(user);
    } else {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.name) {
          setCurrentUser(parsedUser);
        } else {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    }
  }, [user]);

  const getNavType = () => {
    if (currentUser?.role === 'admin') return 'admin';
    if (currentUser?.role === 'charity') return 'organization';
    return 'regular';
  };

  const navType = getNavType();

  const handleProfileClick = () => {
    if (navType === 'admin') navigate('/admin/profile');
    else if (navType === 'organization') navigate('/org/profile');
    else navigate('/profile');
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsDropdownOpen(false);
  };

  const handleSignupClick = () => {
    navigate('/signin');
    setIsMenuOpen(false);
  };

  const getNavLinks = () => {
    switch (navType) {
      case 'admin':
        return [
          { name: 'dashboard', path: '/admin/dashboard', label: 'Dashboard' },
          { name: 'organizations', path: '/admin/organizations', label: 'Organizations' },
          { name: 'donors', path: '/admin/donors', label: 'Donors' },
          { name: 'gallery', path: '/admin/gallery', label: 'Gallery' },
        ];
      case 'organization':
        return [
          { name: 'donations', path: '/org/donations', label: 'Donations' },
          { name: 'chats', path: '/org/chats', label: 'Chats' },
          { name: 'post', path: '/org/post', label: 'Post' },
        ];
      default:
        return [
          { name: 'home', path: '/', label: 'Home' },
          { name: 'category', path: '/category', label: 'Category' },
          { name: 'chats', path: '/user/chats', label: 'Chats' },
          { name: 'feedback', path: '/feedback', label: 'Feedbacks' },
          { name: 'gallery', path: '/gallery', label: 'Gallery' },
          { name: 'about', path: '/about', label: 'About' },
        ];
    }
  };

  return (
    <nav style={{ backgroundColor: '#3276A6E5' }} className="shadow-md relative">
      <div className="h-16 md:h-20 container mx-auto flex items-center justify-between px-4">
        <img
          src={LogoImage}
          alt="Logo"
          className="h-fit max-h-12 md:max-h-16 rounded-full object-cover border-2 border-[#3276A6]"
        />

        <div className="hidden md:flex space-x-8 font-medium mx-auto">
          {getNavLinks().map((link) => {
            const isActive = window.location.pathname === link.path;
            return (
              <a
                key={link.name}
                href={link.path}
                className={`transition-colors hover:text-gray-200 ${
                  isActive ? 'font-bold text-white' : 'text-black'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="hidden md:block relative">
          {currentUser ? (
            <div>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-white font-medium">
                {currentUser.name}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-black rounded shadow-md z-50">
                  <button onClick={handleProfileClick} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200">
                    Profile
                  </button>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={handleSignupClick} className="bg-white text-black font-medium py-2 px-6 rounded-full hover:bg-gray-100">
              Signin
            </button>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
