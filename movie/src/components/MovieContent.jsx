import React from 'react'
import './movieContent.css';
import titleImg from '../images/transformer-title.png';
import Button from './Button';
function MovieContent ({movie}){
  return (
    <div className="content">
    <img src={movie.titleImg} alt="Movie Title" className="movie-title" />
    <h4><span>{movie.year}</span>
        <span><i>{movie.ageLimit}</i></span>
        <span>{movie.length}</span>
        <span>{movie.category}</span>
    </h4>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
         Aspernatur, esse blanditiis explicabo id repudiandae 
         excepturi provident deleniti sapiente officia voluptate, mollitia
         laborum ipsum ratione iste, corrupti accusamus ipsam no
         strum incidunt.
         </p>
         <div className="button">
            <Button icon={<ion-icon name="bookmarks-outline"></ion-icon>}
             name='Book' color="ff3700" bgColor="#ffffff"></Button>
           <Button icon={<ion-icon name="add-circle-outline"></ion-icon>} name='My list'></Button>
         </div>
</div>
  )
}

export default MovieContent