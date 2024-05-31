import React, { useState } from 'react';
import './header.css';
import NavListItem from '../components/NavListItem';
import navListData from '../data/navListData';
import Search from '../components/Search';
import Button from '../components/Button';

const Header = ({ scroll, onSearch }) => {
  const [navList, setNavList] = useState(navListData);
    // CLick NavListItem Header 
  const handleNavOnClick = id => {
    const newNavList = navList.map(nav => {
      nav.active = false;
      if (nav._id === id) {
        nav.active = true;
      }
      return nav;
    });
    setNavList(newNavList);
  };

  return (
    <header className={`${scroll > 100 ? 'scrolled' : ''}`}>
      <a href="#" className="logo">
        MOVIE
      </a>
      <ul className="nav">
        {navList.map(nav => (
          <NavListItem key={nav._id} nav={nav} navOnClick={handleNavOnClick} />
        ))}
      </ul>
      <Search onSearch={onSearch} />
      <Button icon={<ion-icon name="log-in-outline"></ion-icon>} name="Sign In" />
    </header>
  );
};

export default Header;
