import React, { useState, useEffect } from 'react';
import Nav from './Nav.jsx';
import '../css/style.css';

function Home({ Toggle }) {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState(null); // State to track the selected movie
    const moviesPerPage = 5; // Number of movies per page

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch('http://localhost:8081/movies');
            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    // Calculate movies to display on the current page
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    // Go to the previous page
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Go to the next page
    const handleNextPage = () => {
        if (currentPage < Math.ceil(movies.length / moviesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Handle movie click
    const handleMovieClick = async (movie) => {
        try {
            const response = await fetch(`http://localhost:8081/movies/${movie._id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch movie details');
            }
            const data = await response.json();
            setSelectedMovie(data);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    // Close modal
    const closeModal = () => {
        setSelectedMovie(null);
    };

    const totalMovies = movies.length;
    const sortedMovies = [...movies].sort((a, b) => new Date(b.year) - new Date(a.year));
    const latestMovie = sortedMovies.length > 0 ? sortedMovies[0] : null;

    const marqueeContentData = [{ label: 'Total Movies', value: totalMovies }];
    const newMovie = latestMovie ? [{ label: 'New Movie', value: latestMovie.title, image: latestMovie.previewImg }] : [];

    return (
        <div className='px-3'>
            <Nav Toggle={Toggle} />
            <div className='container-fluid'>
                <div className='row g-3 my-2'>
                    <h2 style={{ color: 'white' }}>Dashboard</h2>
                    <div className='col-md-4 p-1'>
                        <div className='p-3 bg-black shadow-sm d-flex justify-content-around align-items-center rounded'>
                            <div className="marquee">
                                <div className="marquee-content">
                                    {marqueeContentData.map((data, index) => (
                                        <div key={index}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <i style={{ color: 'blue', marginRight: '5px', width: '30px' }} className='bi bi-bootstrap-fill me-3 fs-4'></i>
                                                <h4 style={{ color: 'white', marginRight: '5px' }} className='fs-2'>{data.label}</h4>
                                            </div>
                                            <h4 style={{ color: 'white', textAlign: 'center' }} className='fs-3'>{data.value}</h4>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 p-1'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                            <div className="marquee">
                                <div className="marquee-content">
                                    {newMovie.map((data, index) => (
                                        <div key={index}>
                                            <h3 style={{ color: 'black', marginRight: '5px' }} className='fs-2'>{data.label}</h3>
                                            <p style={{ color: 'black' }} className='fs-5'>{data.value}</p>
                                            
                                            <img src={`../assets/movies/${data.image}`} alt={data.value} style={{ maxWidth: '100px', maxHeight: '100px',borderRadius : '10px'}} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <i className='bi bi-currency-dollar p-3 fs-1'></i>
                        </div>
                    </div>
                    <div className='col-md-4 p-1'>
                        <div className='p-3 bg-black shadow-sm d-flex justify-content-around align-items-center rounded'>
                            <div className="marquee">
                                <div className="marquee-content">
                                    <h3 className='fs-2'>50</h3>
                                    <p className='fs-5'>Total Users</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table className="table caption-top bg-white rounded mt-2">
                <caption className='text-white fs-4'>Danh sách phim</caption>
                <thead>
                    <tr>
                        <th style={{ backgroundColor: '#FFC0CB' }} scope="col">#</th>
                        <th style={{ backgroundColor: '#FFC0CB' }} scope="col">Hình ảnh</th>
                        <th style={{ backgroundColor: '#FFC0CB' }} scope="col">Video</th>
                        <th style={{ backgroundColor: '#FFC0CB' }} scope="col">Tên phim</th>
                        <th style={{ backgroundColor: '#FFC0CB' }} scope="col">Thể loại</th>
                        <th style={{ backgroundColor: '#FFC0CB' }} scope="col">Ngôn ngữ</th>
                        <th style={{ backgroundColor: '#FFC0CB' }} scope="col">Năm</th>
                        <th style={{ backgroundColor: '#FFC0CB' }} scope="col">Giờ</th>
                    </tr>
                </thead>
                <tbody>
                    {currentMovies.map((movie, index) => (
                        <tr key={index} onClick={() => handleMovieClick(movie)} style={{ cursor: 'pointer' }}>
                            <th scope='row'>{indexOfFirstMovie + index + 1}</th>
                            <td>
                            <td><img src={`../assets/movies/${movie.previewImg}`} alt="Movie Poster" style={{ maxWidth: '100px', maxHeight: '100px',borderRadius : '10px' }} /></td>
                            </td>
                            <td> {movie.video.includes("youtube.com") ? (
                                <iframe
                                    src={movie.video}
                                    controls
                                    style={{ maxWidth: '200px', maxHeight: '100px' }}
                                />
                            ) : (
                                <video
                                    src={`../assets/movies/${movie.video}`}
                                    controls
                                    style={{ maxWidth: '200px', maxHeight: '200px' , borderRadius : '15px'}}
                                />
                            )}</td>
                            <td>{movie.title}</td>
                            <td>{movie.category_name}</td>
                            <td>{movie.language}</td>
                            <td>{movie.year}</td>
                            <td>{movie.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination" style={{ justifyContent: 'flex-end' }}>
                <button className="btn btn-warning" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <button className="btn btn-warning" onClick={handleNextPage} disabled={currentPage === Math.ceil(movies.length / moviesPerPage)}>Next</button>
            </div>
            {selectedMovie && <MovieDetailModal movie={selectedMovie} onClose={closeModal} />}
        </div>
    );
}

function MovieDetailModal({ movie, onClose }) {
    return (
        <div className="modal-overlay4">
            <div className="modal4">
                <div className="modal-header4">
                    <h3 style={{ color: 'white', fontStyle: 'bold' }}>{movie.title}</h3>
                    <button className="button-close" onClick={onClose}>Close</button>
                </div>
                <div className="modal-body4">
                    <img src={movie.previewImg} alt="Movie Poster" style={{ maxWidth: '40%' }} />
                    <p><strong>Category:</strong> {movie.category_name}</p>
                    <p><strong>Year:</strong> {movie.year}</p>
                    <p><strong>Length:</strong> {movie.length}</p>
                    <p><strong>Description:</strong> {movie.description}</p>
                    <p><strong>Cast:</strong></p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {movie.actors.map((actor, index) => (
                            <div key={index} style={{ marginRight: '10px', textAlign: 'center' }}>
                                <img src={`../assets/images/${actor.profile_img}`} alt={actor.name} style={{ maxWidth: '100px' }} />
                                <p>{actor.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
