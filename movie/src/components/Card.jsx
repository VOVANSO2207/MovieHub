


import React from 'react';
import '../css/card.css';
import { Link } from 'react-router-dom';

function Card({ movie }) {
    return (
        <div className="col-lg-2 col-md-4 col-sm-6 cardMovie">
            <div className="movie-card">
                <img src={`../assets/movies/${movie.previewImg}`} alt="Preview" className='img-fluid' />
                <p>{movie.length} | {movie.category_name}</p>
                <div className="content">
                    <h4>{movie.title}</h4>
                    <div className="card-icons">
                        <Link to={`/watch/${movie._id}`}>
                            <ion-icon name="play-outline"></ion-icon>
                        </Link>
                      
                    </div>
                </div>
            </div>
            
        </div>
        
    );
}

export default Card;
