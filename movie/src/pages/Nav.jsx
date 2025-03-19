import React from 'react';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import { Link } from 'react-router-dom';
function Nav({ Toggle }) {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
            <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}></i>
            <button
                className="navbar-toggler d-lg-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId"
                aria-controls="collapsibleNavId"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <i className='bi bi-justify'></i>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                <li className="nav-item">
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn" style={{background: '#FF4500'}} type="submit">Search</button>
                        </form>
                    </li>
                  
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
