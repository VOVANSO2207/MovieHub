import React, { useState } from 'react';
import './header.css';
import NavListItem from '../components/NavListItem';
import navListData from '../data/navListData';
import Search from '../components/Search';
import Button from '../components/Button';

const Header = ({ scroll }) => {
    const [navList, setNavList] = useState(navListData);
    const handleNavOnClick = id => {
        const newNavList = navList.map(nav => {
            nav.active = false;
            if (nav._id === id) {
                nav.active = true;
                console.log(`Clicked on ${nav.name}`);
            }
            return nav;
        });
        setNavList(newNavList);
    };
    return (
        <header className={`${scroll > 100 ? 'scrolled' : undefined}`}>
            <a href="#" className="logo">
                Cinema
            </a>
            <ul className="nav">
                {
                    navList.map(nav => (
                        <NavListItem key={nav._id} nav={nav} navOnClick={handleNavOnClick}></NavListItem>
                    ))
                }
            </ul>
            <Search></Search>
            <Button icon={<ion-icon name="log-in-outline"></ion-icon>} name='Sign In'></Button>
        </header>
    )
}

export default Header;