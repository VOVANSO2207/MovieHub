import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../css/watchMovie.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import RelatedMovie from './RelatedMovie';
import Footer from './Footer';
import Header from './Header';
import axios from 'axios';

function WatchMovie() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [slides, setSlides] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editCommentId, setEditCommentId] = useState(null);
    const [editedCommentContent, setEditedCommentContent] = useState('');
    const [replyCommentId, setReplyCommentId] = useState(null);
    const [newReplyContent, setNewReplyContent] = useState('');
    const videoPlayerRef = useRef(null);
    const videoRef = useRef(null);
    const [scroll, setScroll] = useState(0);


    useEffect(() => {
        fetch(`http://localhost:8081/movies/${movieId}`)
            .then(response => response.json())
            .then(data => {
                setMovie(data);
                setSlides(data.actors || []);
                setComments(data.comments || []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                setError(error);
                setLoading(false);
            });

        const handleScroll = () => {
            setScroll(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [movieId]);

    const handlePlayWatchClick = () => {
        videoPlayerRef.current.scrollIntoView({ behavior: 'smooth' });
        videoRef.current.src += "?autoplay=1";
    };

    // Trong hàm handlePostComment:
    const handlePostComment = () => {
        if (!newComment.trim()) {
            alert('Comment cannot be empty');
            return;
        }

        const newCommentData = {
            user_id: 1, // Temporarily set user_id or get it from current user state
            movie_id: movieId,
            parent_comment_id: null, // Or ID of parent comment if it's a reply
            content: newComment,
        };

        fetch('http://localhost:8081/addComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCommentData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Comment added successfully') {
                    setComments(prevComments => [...prevComments, {
                        ...newCommentData,
                        comment_id: data.results.insertId,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                        username: data.username // Add username to comment data
                    }]);
                    setNewComment("");
                } else {
                    console.error('Failed to add comment:', data.error);
                }
            })
            .catch(error => {
                console.error('Error adding comment:', error);
            });
    };


    const handleEditComment = (commentId, content) => {
        setEditCommentId(commentId);
        setEditedCommentContent(content);
    };

    const handleSaveEditedComment = (commentId) => {
        const updatedComment = {
            user_id: 1,
            movie_id: movieId,
            parent_comment_id: null,
            content: editedCommentContent,
            updated_at: new Date().toISOString() // Cập nhật thời gian hiện tại
        };

        axios.put(`http://localhost:8081/updateComment/${commentId}`, updatedComment)
            .then(response => {
                const data = response.data;
                console.log(data);
                if (data.message === 'Comment updated successfully') {
                    setComments(prevComments => prevComments.map(comment =>
                        comment.comment_id === commentId ? { ...comment, content: editedCommentContent, updated_at: new Date().toISOString() } : comment
                    ));
                    setEditCommentId(null);
                    setEditedCommentContent('');
                } else {
                    console.error('Failed to update comment:', data.error);
                }
            })
            .catch(error => {
                console.error('Error updating comment:', error);
            });
    };
    // Trong hàm handleLikeComment
    const handleLikeComment = (commentId, liked) => {
        if (liked) {
            // Nếu đã thích, gửi yêu cầu hủy thích
            axios.delete(`http://localhost:8081/unlikeComment/${commentId}`, {
                data: { user_id: 1 } // Điền user_id tương ứng
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    if (data.message === 'Like removed successfully') {
                        // Cập nhật số lượt like của bình luận và trạng thái thích
                        setComments(prevComments => prevComments.map(comment =>
                            comment.comment_id === commentId ? { ...comment, likes_count: comment.likes_count - 1, liked: false } : comment
                        ));
                    } else {
                        console.error('Failed to unlike comment:', data.error);
                    }
                })
                .catch(error => {
                    console.error('Error unliking comment:', error);
                });
        } else {
            // Nếu chưa thích, gửi yêu cầu thích
            axios.post(`http://localhost:8081/likeComment`, {
                user_id: 1, // Điền user_id tương ứng
                comment_id: commentId,
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    if (data.message === 'Like added successfully') {
                        // Cập nhật số lượt like của bình luận và trạng thái thích
                        setComments(prevComments => prevComments.map(comment =>
                            comment.comment_id === commentId ? { ...comment, likes_count: comment.likes_count + 1, liked: true } : comment
                        ));
                    } else {
                        console.error('Failed to like comment:', data.error);
                    }
                })
                .catch(error => {
                    console.error('Error liking comment:', error);
                });
        }
    };


    const handleDeleteComment = (commentId) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) {
            return;
        }
        axios.delete(`http://localhost:8081/comments/${commentId}`)
            .then(response => {
                if (response.status === 200) {
                    setComments(prevComments => prevComments.filter(comment => comment.comment_id !== commentId));
                } else {
                    console.error('Failed to delete comment:', response.data.error);
                }
            })
            .catch(error => {
                console.error('Error deleting comment:', error);
            });
    };


    const handlePostReply = (parentCommentId) => {
        if (!newReplyContent.trim()) {
            alert('Reply cannot be empty');
            return;
        }

        const newReplyData = {
            user_id: 1, // Temporarily set user_id or get it from current user state    
            movie_id: movieId,
            parent_comment_id: parentCommentId,
            content: newReplyContent,
        };

        fetch('http://localhost:8081/addComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newReplyData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Comment added successfully') {
                    setComments(prevComments => [...prevComments, {
                        ...newReplyData,
                        comment_id: data.results.insertId,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                        username: data.username // Add username to comment data
                    }]);
                    setReplyCommentId(null);
                    setNewReplyContent("");
                } else {
                    console.error('Failed to add reply:', data.error);
                }
            })
            .catch(error => {
                console.error('Error adding reply:', error);
            });
    };


    const renderComments = (comments, parentId = null) => {
        return comments
            .filter(comment => comment.parent_comment_id === parentId)
            .map(comment => (
                <div className={`commented ${parentId ? 'replied' : ''}`} key={comment.comment_id}>
                    <img src="../assets/images/default.jpg" alt="User" className="comment-user-img" />
                    <div className="content-comment">
                        <span className="comment-user-name">{comment.username}</span>
    
                        {editCommentId === comment.comment_id ? (
                            <div>
                                <input
                                    className="edit-comment-textarea"
                                    value={editedCommentContent}
                                    onChange={(e) => setEditedCommentContent(e.target.value)}
                                ></input>
                                <button className="save-edit-comment" onClick={() => handleSaveEditedComment(comment.comment_id)}>Save</button>
                                <button onClick={() => setEditCommentId(null)} className="btn btn-secondary">Cancel</button>
                            </div>
                        ) : (
                            <p className="comment-text">{comment.content}</p>
                        )}
    
                        <span style={{ color: 'gray' }}> {new Date(comment.created_at).toLocaleString()}</span>
    
                        <div className="interact">
                            <button className="interact-button" onClick={() => handleLikeComment(comment.comment_id, comment.liked)}>
                                <ion-icon name="thumbs-up-outline"></ion-icon>{comment.liked ? 'Liked' : 'Like'}
                            </button>
                            <span>{comment.likes_count} Likes</span>
    
                            <button className="interact-button" onClick={() => setReplyCommentId(comment.comment_id)}>
                                <ion-icon name="chatbubble-outline"></ion-icon> Reply
                            </button>
    
                            <button className='edit-comment' onClick={() => handleEditComment(comment.comment_id, comment.content)}>
                                Edit
                            </button>
                            <button onClick={() => handleDeleteComment(comment.comment_id)} className="btn btn-danger btn-sm">Delete</button>
                        </div>
    
                        {replyCommentId === comment.comment_id && (
                            <div className="comment-input" style={{ marginLeft: '40px' }}>
                                <img src="../assets/images/default.jpg" alt="User" className="comment-user-img" />
                                <textarea
                                    type="text"
                                    placeholder='Write a reply...'
                                    className="comment-input-field"
                                    value={newReplyContent}
                                    onChange={(e) => setNewReplyContent(e.target.value)}
                                />
                                <button className="comment-button" onClick={() => handlePostReply(comment.comment_id)}>Reply</button>
                            </div>
                        )}
    
                        <div className="replies">
                            {renderComments(comments, comment.comment_id)} {/* Recursively render replies */}
                        </div>
                    </div>
                </div>
            ));
    };
    


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading movie details. Please try again later.</p>;
    }

    return (
        <div>
            <div className="header">
                <Header scroll={scroll} />
            </div>
            <div className="main-content">
                <div className="container d-flex justify-content-center mt-5">
                    <div className="row">
                        <div className="col-lg-5 col-md-12">
                            <div className="img-movie">
                                <img src={`../assets/movies/${movie.previewImg}`} alt={movie.title} className='img-fluid' />
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-12">
                            <h2>{movie.title} ({movie.year})</h2>
                            <div className="row">
                                <ul className="filter-category">
                                    <li>{movie.category_name}</li>
    
                                    {/* <div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="" data-action="" data-size="" data-share="true"></div> */}
                                </ul>
                            </div>
                            <div className="col-lg-7 mt-3">
                                <h2 className='detail-description'>Description</h2>
                                <p className={movie.description.length > 100 ? "description" : ""}>{movie.description}</p>
    
                                <div className="actor-list">
                                    <p style={{ color: 'gray', fontWeight: 'bold', marginRight: '5px' }}>Cast:</p>
                                    {movie.actors.map((actor, index) => (
                                        <p className="actor-item" key={index}>{actor.name},</p>
                                    ))}
                                </div>
    
                                <div className="time-movie">
                                    <p className="Runtime"><span style={{ color: '#fff' }}>Runtime</span> : {movie.length}</p>
                                    <p className="RealeaseDate"><span style={{ color: '#fff' }}>Realease Date:</span> {movie.date}</p>
                                </div>
                                <div className="title-language">
                                    <span className='language'>Language: {movie.language}</span>
                                    <span className="playWatch" onClick={handlePlayWatchClick}>
                                        <ion-icon name="play-circle-outline" className="play-watch-icon"></ion-icon> Watch
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-5">
                    <h2 className='top-cast'>Top Cast</h2>
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
                                            <img src={`../assets/images/${slide.profile_img}`} alt={slide.name} className="img-fluid" />
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
                <div className="container mt-5" ref={videoPlayerRef}>
                    <h2 className='watch-movie'>Watch Movie</h2>
                    <div className="video-player">
                        {movie.video.includes("youtube.com") ? (
                            <iframe
                                ref={videoRef}
                                width="100%"
                                height="500px"
                                src={movie.video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <video
                                width="100%"
                                height="400px"
                                src={`../assets/movies/${movie.video}`}
                                controls
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></video>
                        )}
                    </div>
                </div>
                <RelatedMovie />
                <div className="container mt-5">
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px', color: '#fff', textTransform: 'uppercase', borderBottom: '2px solid #ff5c00' }}>Reviews</h2>
    
                    <div className="all-comments">
                        <div className="total-comment">
                            {comments.length} Comments
                        </div>
                        <div className="comment-input">
                            <img src="../assets/images/default.jpg" alt="User" className="comment-user-img" />
                            <textarea
                                type="text"
                                placeholder='Write something...'
                                className="comment-input-field"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button className="comment-button" onClick={handlePostComment}>Post</button>
                        </div>
                        <div className="comment-list">
                            {comments && comments.length > 0 && renderComments(comments)}
                        </div>
                    </div>
                </div>
                <div className="footer mt-5">
                    <Footer />
                </div>
            </div>
        </div>
    );
    
}

export default WatchMovie;
