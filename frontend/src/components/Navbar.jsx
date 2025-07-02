import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ChevronDown, Settings, LogOut } from 'lucide-react';
import { useRef, useState } from 'react';

const Navbar = ({ user = {}, onLogout }) => {
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  const handleClickOutside = (event) => {
    // CHANGE STARTS HERE
    if (menuRef.current && !menuRef.current.contains(event.target)) { // Corrected menuref to menuRef
    // CHANGE ENDS HERE
      setMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  const handleMenuToggle = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    setMenuOpen(false);
    onLogout();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 font-sans">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 max-w-7xl mx-auto">
        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate('/')}
        >
          {/* LOGO */}
          <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 shadow-lg group-hover:shadow-purple-300/50 group-hover:scale-105 transition-all duration-300">
            <Zap className="w-6 h-6 text-white" />
            <div className="absolute bottom-[-1px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-md animate-ping" />
          </div>
          {/* BRAND NAME */}
          <span className="text-2xl font-extrabold bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-wide">
            TaskPulse
          </span>
        </div>
        {/* USER DROPDOWN AND SETTINGS */}
        <div className="flex items-center gap-2">
          {/* Settings Button */}
          <button
            className="p-2 text-gray-600 rounded-full hover:bg-purple-50 hover:text-purple-500 transition-colors duration-300"
            onClick={() => navigate('/profile')}
          >
            <Settings className="w-5 h-5" />
          </button>
          {/* USER DROPDOWN */}
          <div ref={menuRef} className="relative">
            <button
              onClick={handleMenuToggle}
              className="flex items-center gap-1 px-2 py-1 rounded-full cursor-pointer hover:bg-purple-50 transition-colors duration-300 border border-transparent hover:border-purple-200"
            >
              <div className="relative">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-500 text-white font-semibold shadow-md">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`} />
            </button>
            {menuOpen && (
              <ul className="absolute top-10 right-0 w-48 bg-purple-100 rounded-lg shadow-md border border-purple-200 z-50 overflow-hidden">
                <li className="p-2">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate('/profile');
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-purple-200 flex items-center gap-2"
                    role="menuitem"
                  >
                    <Settings className="w-4 h-4 text-gray-700" />
                    Profile Setting
                  </button>
                </li>
                <li className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;