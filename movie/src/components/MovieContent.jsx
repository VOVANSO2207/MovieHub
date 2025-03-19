import React, { useState, useEffect } from 'react';
import '../css/movieContent.css';
import Button from './Button';

function MovieContent({ movie }) {
  const [modalOpen, setModalOpen] = useState(false);
  
  // Mở modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Đóng modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Xử lý khi modal mở/đóng
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalOpen]);

  // Rút gọn mô tả nếu quá dài
  const shortDescription = movie.description.length > 100 
    ? `${movie.description.substring(0, 100)}...` 
    : movie.description;

  return (
    <div className={`content ${movie.active ? 'active' : undefined}`}>
      <img src={`../assets/movies/${movie.titleImg}`} alt="Movie Title" className="movie-title" />
      <h4>
        <span>{movie.year}</span>
        <span><i>{movie.ageLimit}</i></span>
        <span>{movie.length}</span>
        <span>{movie.category_name}</span>
      </h4>
      
      <div className="description-container">
        <p className="short-description">
          {shortDescription}
          {movie.description.length > 100 && (
            <span className="read-more" onClick={openModal}>...</span>
          )}
        </p>
      </div>
      
      <span>{movie.date}</span>
      <div className="button">
        <Button 
          icon={<ion-icon name="bookmarks-outline"></ion-icon>} 
          name='Book' 
          color="ff3700" 
          bgColor="#ffffff"
        />
        <Button 
          icon={<ion-icon name="add-circle-outline"></ion-icon>} 
          name='My list'
        />
      </div>

      {/* Modal Overlay */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{movie.title}</h3>
              <button className="close-button" onClick={closeModal}>
                <ion-icon name="close-outline"></ion-icon>
              </button>
            </div>
            <div className="modal-body">
              <p>{movie.description}</p>
            </div>
            <div className="modal-footer">
              <button className="modal-button" onClick={closeModal}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieContent;