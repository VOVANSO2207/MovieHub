import React, { useState, useEffect } from 'react';
import './header.css';
import NavListItem from '../components/NavListItem';
import navListData from '../data/navListData';
import Search from '../components/Search';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import logo from '../images/favicon.png';

const Header = ({ scroll, onSearch }) => {
  const [navList, setNavList] = useState(navListData);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle navigation click
  const handleNavOnClick = id => {
    const newNavList = navList.map(nav => {
      nav.active = false;
      if (nav._id === id) {
        nav.active = true;
      }
      return nav;
    });
    setNavList(newNavList);
    setMobileMenuOpen(false); // Close mobile menu after selection
  };

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className={`${scroll > 100 ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}>
        <div className="header-container">
          <Link to="/" className='logo'>
            <img src={logo} alt="Logo" />
          </Link>
          
          <div className="header-right">
            <ul className="nav">
              {navList.map(nav => (
                <NavListItem key={nav._id} nav={nav} navOnClick={handleNavOnClick} />
              ))}
            </ul>
            
            <div className="header-actions">
              <Search onSearch={onSearch} />
              <Button icon={<ion-icon name="log-in-outline"></ion-icon>} name="Sign In" />
            </div>
            
            <div 
              className="menu-toggle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="overlay-header">
            <Link to="/" className='logo'>
              <img src={logo} alt="Logo" />
            </Link>
            <button className="close-menu" onClick={() => setMobileMenuOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
              </svg>
            </button>
          </div>
          
          <ul className="mobile-nav">
            {navList.map(nav => (
              <NavListItem key={nav._id} nav={nav} navOnClick={handleNavOnClick} />
            ))}
          </ul>
          
          <div className="mobile-actions">
            <Search onSearch={onSearch} />
            <Button icon={<ion-icon name="log-in-outline"></ion-icon>} name="Sign In" />
          </div>
        </div>
      </header>
      
      {/* Overlay backdrop */}
      <div 
        className={`menu-backdrop ${mobileMenuOpen ? 'active' : ''}`} 
        onClick={() => setMobileMenuOpen(false)}
      ></div>
    </>
  );
};

export default Header;