import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/watchMovie.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import RelatedMovie from './RelatedMovie';
import Footer from './Footer';
function WatchMovie() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [slides, setSlides] = useState([]);
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
        fetch(`http://localhost:8081/movies/${movieId}`)
            .then(response => response.json())
            .then(data => {
                setMovie(data);
                setSlides(data.actors || []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                setError(error);
                setLoading(false);
            });

        fetchComments(); // Call the function to fetch comments
    }, [movieId]);

    const fetchComments = () => {
        fetch(`http://localhost:8081/comments`)
            .then(response => response.json())
            .then(data => {
                setComments(data);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
                setError(error);
            });
    };


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading movie details. Please try again later.</p>;
    }

    return (
        <div>
            {/* <Header></Header> */}
            <div className="container d-flex justify-content-center mt-5">
                <div className="row">
                    <div className="col-lg-5 col-md-12">
                        <div className="img-movie">
                            <img src={movie.previewImg} alt={movie.title} className='img-fluid'/>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-12">
                        <h2>{movie.title} ({movie.year})</h2>
                        <div className="row">
                            <ul className="filter-category">
                                <li>{movie.category_name}</li>
                                <li>{movie.category_name}</li>
                            </ul>
                        </div>
                        <div className="col-lg-7 mt-3">
                            <h2 className='detail-description'>Description</h2>
                            <p className={movie.description.length > 100 ? "description" : ""}>{movie.description}</p>
                            <div className="time-movie">
                        
                            <p className="Runtime"><span style={{color:'#fff' }}>Runtime</span> : {movie.length}</p>
                            <p className="RealeaseDate"> <span style={{color:'#fff'}}>Realease Date :</span> {movie.date}</p>
                            </div>
                            <div className="title-language">
                            
                                    <span className='language'>Language : {movie.language}</span>
                                    <span className="playWatch">
                                    <ion-icon name="play-circle-outline" className="play-watch-icon"></ion-icon>  Watch
                                    </span>
                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h2 className='mt-5'>Top Cats</h2>
                <div className="row">
                    <Swiper
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            480: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            640: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                            992: {
                                slidesPerView: 6,
                                spaceBetween: 30,
                            },
                        }}
                        spaceBetween={30}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        modules={[Autoplay, Navigation, Pagination]}
                        className="trendSwiper"
                    >
                        {slides && slides.length > 0 && slides.map((slide) => (
                            <SwiperSlide key={slide.actor_id}>
                                <div className="actor-profile">
                                    <div className="border-img">
                                    <img src={`../assets/images/${slide.profile_img}`} alt={slide.name} className="img-fluid"/>

                                    </div>
                                    <a href="#">
                                    <p>{slide.name}</p>
                                    </a>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className="container mt-5">
                <h2>Watch Movie </h2>
                <div className="video-player">
                <iframe 
                        width="100%" 
                        height="500px" 
                        src={movie.video} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>

                </div>
            </div>
            {/* <div className="container mt-5"> */}
                <RelatedMovie></RelatedMovie>

            
                
            {/* </div> */}
            <div className="container mt-5">
                <h2>Comments</h2>
                <div className="all-comments">
                    <div className="total-comment">
                        {comments.length} Comments
                    </div>
                    <div className="comment-input">
                        <img src="../assets/images/default.jpg" alt="User" className="comment-user-img" />
                        <input type="text" placeholder='Write something...' className="comment-input-field" />
                        <button className="comment-button">Post</button>
                    </div>
                    <div className="comment-list">
                        {comments.map(comment => (
                            <div className="commented" key={comment.comment_id}>
                                <img src="../assets/images/default.jpg" alt="User" className="comment-user-img" />
                                <div className="content-comment">
                                    <span className="comment-user-name">{comment.username}</span>
                                    <p className="comment-text">{comment.content}</p>
                                    <div className="interact">
                                        <button className="interact-button">
                                            <ion-icon name="thumbs-up-outline"></ion-icon>Like
                                        </button>
                                        <button className="interact-button">
                                            <ion-icon name="chatbubble-outline"></ion-icon> Reply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="footer mt-5">

            <Footer></Footer>
            </div>
        </div>
    );
}

export default WatchMovie;
