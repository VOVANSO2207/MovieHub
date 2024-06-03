import React, { useState, useEffect } from "react";
import axios from "axios";

const languageOptions = [
    { value: 'Vietnamese', label: 'Vietnamese', flag: '🇻🇳' },
    { value: 'English', label: 'English', flag: '🇬🇧' },
    { value: 'Spanish', label: 'Spanish', flag: '🇪🇸' },
    { value: 'French', label: 'French', flag: '🇫🇷' },
    { value: 'Korean', label: 'Korean', flag: '🇰🇷' },
    { value: 'Japanese', label: 'Japanese', flag: '🇯🇵' }
];

const years = [];
for (let i = new Date().getFullYear(); i >= 1900; i--) {
    years.push(i);
}

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 5;

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:8081/movies');
            setMovies(response.data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const handleEdit = (index) => {
        setSelectedMovie({ ...movies[index], index: index });
        setShowEditModal(true);
    };

    const handleSaveEdit = async (editedMovie) => {
        try {
            const response = await axios.put(`http://localhost:8081/movies/${editedMovie._id}`, editedMovie);
            if (response.status === 200) {
                const updatedMovies = [...movies];
                const index = selectedMovie.index;
                updatedMovies[index] = editedMovie;
                setMovies(updatedMovies);
                setShowEditModal(false);
                setShowSuccessModal(true);
            }
        } catch (error) {
            console.error("Error saving movie:", error);
        }
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
    };

    const handleDelete = (index) => {
        setShowDeleteConfirmation(true);
        setDeleteIndex(index);
    };

    const handleConfirmDelete = async () => {
        try {
            const movieToDelete = movies[deleteIndex];
            const response = await axios.delete(`http://localhost:8081/movies/${movieToDelete._id}`);
            if (response.status === 200) {
                const updatedMovies = [...movies];
                updatedMovies.splice(deleteIndex, 1);
                setMovies(updatedMovies);
                setShowDeleteConfirmation(false);
                setShowSuccessModal(true);
            }
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    };

    const handleCloseDeleteConfirmation = () => {
        setShowDeleteConfirmation(false);
    };

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(movies.length / moviesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className='px-3'>
            <h1 className='text-white'>Movie List</h1>
            <table className="table caption-top bg-white rounded mt-5">
                <thead>
                    <tr className="table-movie" style={{ background: 'red' }}>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Video</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Language</th>
                        <th scope="col">Date</th>
                        <th scope="col">Year</th>
                        <th scope="col">Hour</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentMovies.map((movie, index) => (
                        <tr key={index}>
                            <th scope="row">{indexOfFirstMovie + index + 1}</th>
                            <td><img src={`../assets/movies/${movie.previewImg}`} alt="Movie Poster" style={{ maxWidth: '200px', maxHeight: '200px',borderRadius : '10px' }} /></td>
                            <td> {movie.video.includes("youtube.com") ? (
                                <iframe
                                    src={movie.video}
                                    controls
                                    style={{ maxWidth: '200px', maxHeight: '200px' }}
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
                            <td>{movie.date}</td>
                            <td>{movie.year}</td>
                            <td>{movie.length} hrs</td>
                            
                            <td>
                                <button className="btn btn-warning" onClick={() => handleEdit(indexOfFirstMovie + index)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(indexOfFirstMovie + index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination" style={{ justifyContent: 'flex-end' }}>
                <button className="btn btn-warning" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <button className="btn btn-warning" onClick={handleNextPage} disabled={currentPage === Math.ceil(movies.length / moviesPerPage)}>Next</button>
            </div>
            {showEditModal && (
                <EditModal movie={selectedMovie} onSaveEdit={handleSaveEdit} onClose={() => setShowEditModal(false)} />
            )}
            {showSuccessModal && (
                <SuccessModal message="Success" onClose={handleCloseSuccessModal} />
            )}
            {showDeleteConfirmation && (
                <DeleteConfirmationModal onConfirmDelete={handleConfirmDelete} onClose={handleCloseDeleteConfirmation} />
            )}
        </div>
    );
}

function EditModal({ movie, onSaveEdit, onClose }) {
    const [editedMovie, setEditedMovie] = useState({ ...movie });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8081/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveEdit(editedMovie);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedMovie({ ...editedMovie, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setEditedMovie({ ...editedMovie, titleImg: URL.createObjectURL(file) });
    };

    const handleLanguagesChange = (e) => {
        const selectedLanguages = Array.from(e.target.selectedOptions).map(option => option.value);
        setEditedMovie({ ...editedMovie, languages: selectedLanguages });
    };

    return (
        <div className="modal-overlay1">
            <div className="modal1">
                <div className="modal-header1">
                    <h3 style={{ color: 'white', fontStyle: 'bold' }}>Edit Movie</h3>
                    <button className="button-close" onClick={onClose}>Close</button>
                </div>
                <div className="modal-body1">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input type="text" style={{ color: 'white' }} id="title" name="title" value={editedMovie.title} onChange={handleChange} />
                        </div>
                        <label htmlFor="image">Image:</label>
                        <input style={{ color: 'white', width: '50%' }} type="file" id="image" onChange={handleImageChange} accept="image/*" />
                        <div className="form-group">
                            <label htmlFor="category" style={{ color: 'white' }}>Category:</label>
                            <select
                                id="category"
                                name="category_id"
                                value={editedMovie.category_id}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                            >
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="languages" style={{ color: 'white' }}>Languages:</label>
                            <select
                                id="languages"
                                name="languages"
                                multiple
                                value={editedMovie.languages}
                                onChange={handleLanguagesChange}
                                style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                            >
                                {languageOptions.map((language) => (
                                    <option key={language.value} value={language.value}>
                                        {language.label} {language.flag}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="year" style={{ color: 'white' }}>Year:</label>
                            <select
                                id="year"
                                name="year"
                                value={editedMovie.year}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                            >
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="hours" style={{ color: 'white' }}>Duration:</label>
                            <input type="number" id="hours" name="length" value={editedMovie.length} onChange={handleChange} />
                        </div>
                        <button className="btn btn-primary" type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

function SuccessModal({ message, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>{message}</h3>
                    <button className="button-close" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

function DeleteConfirmationModal({ onConfirmDelete, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>Confirm Deletion</h3>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to delete this movie?</p>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-danger" onClick={onConfirmDelete}>Delete</button>
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default MovieList;
