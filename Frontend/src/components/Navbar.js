import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const toggleMenu = () => {
    if (isMobile) {
      setMenuActive(!menuActive);
    }
  };

  // Function to handle window resizing and update `isMobile` state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 750);
      if (window.innerWidth > 750) {
        setMenuActive(false); // Ensure the menu is always open on desktop
      }
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="navbar-container">
      <nav className="navbar">
        {/* Toggler Button (Only visible on mobile) */}
        <button className="navbar-toggler" onClick={toggleMenu}>
        <GiHamburgerMenu/>
        </button>

        {/* Navbar Content */}
        <div className={`navbar-content ${menuActive ? 'navbar-active' : ''}`}>
          <Link className="nav-link" to="/story" onClick={toggleMenu}>
            Home
          </Link>
          <Link className="nav-link" to="/about" onClick={toggleMenu}>
            About
          </Link>
          <Link className="nav-link" to="/contact" onClick={toggleMenu}>
            Contact
          </Link>
          <Link className="nav-link" to="/user" onClick={toggleMenu}>
            Profile
          </Link>
          <Link className="nav-link logout" onClick={() => { logout(); toggleMenu(); }} to="/">
            Logout
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
