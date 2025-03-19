import React, { useState, useEffect } from 'react';
import './banner.css';
import MovieContent from '../components/MovieContent';
import MovieDate from '../components/MovieDate';
import PlayBtn from '../components/PlayBtn';
import MovieSwiper from '../components/MovieSwiper';

function Banner() {
    const [movies, setMovies] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    
    const fetchData = () => {
        fetch('http://localhost:8081/movies')
            .then(res => res.json())
            .then(data => setMovies(data))
            .catch(e => console.log(e.message));
    };
    
    // Check for mobile/tablet screen size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 991);
        };
        
        // Set initial value
        handleResize();
        
        // Add event listener
        window.addEventListener('resize', handleResize);
        
        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const handleSlideChange = id => {
        const newMovies = movies.map(movie => {
            movie.active = false;
            if (movie._id === id) {
                movie.active = true;
              
            }
            return movie;
        });
        setMovies(newMovies);
    };
    
    return (
        <div className="banner">
            {movies && movies.length > 0 && movies.map(movie => (
                <div className="movie" key={movie._id}>
                    <img 
                        src={`../assets/movies/${movie.bgImg}`} 
                        alt="BackGround Image" 
                        className={`bgImg ${movie.active ? 'active' : undefined}`} 
                    />
                    <div className="container-fluid">
                        <div className="row">
                            <div className={isMobile ? "col-12 contentBannerHezo" : "col-lg-6 col-md-12"}>
                                <MovieContent movie={movie} />
                            </div>
                            <div className={isMobile ? "col-12 contentBannerDate" : "col-lg-6 col-md-12"}>
                                <MovieDate movie={movie} />
                                <PlayBtn movie={movie} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {movies && movies.length > 0 && 
                <MovieSwiper slides={movies} slideChange={handleSlideChange} />
            }
        </div>
    );
}

export default Banner;