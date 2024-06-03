import React, { useState,useEffect} from 'react'
import './trend.css';
import { Swiper,SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import TrendCard from '../components/TrendCard';

function Trend() {
    const [slides,setSlides] = useState([]);
    const fetchData = () => {
        fetch('http://localhost:3000/data/movieData.json')
            .then(res => res.json())
           .then(data =>{
            setSlides(data);
           })
           .catch(e => console.log(e.message));
    };

    useEffect(() => {
        fetchData();
    }, []);
  return (
   <section id="trend" className='trend'>
        <div className="container-fluid">
            <div className="row">
                <h4 className="section-title">Coming Soon</h4>
            </div>
            <div className="row">
                <Swiper
                    breakpoints={{
                        320:{
                            slidesPerView: 1 ,
                            spaceBetween : 20 ,
                        },
                        480:{
                            slidesPerView: 3 ,
                            spaceBetween : 30 ,
                        },
                        640:{
                            slidesPerView: 4 ,
                            spaceBetween : 30 ,
                        },
                        992:{
                            slidesPerView: 6 ,
                            spaceBetween : 30 ,
                        },

                    }}
                    spaceBetween={30}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false, 
                    }}
                    loop = {true}
                    modules={[Autoplay]}
                    className="trendSwiper"
                >
                        {
                            slides && slides.length > 0 && slides.map(slide => (
                                <SwiperSlide key={slide._id}>
                                        <TrendCard slide={slide}></TrendCard>
                                </SwiperSlide>
                            ))
                        }
                </Swiper>
            </div>
        </div>
   </section>
  );
}

export default Trend;








// import React, { useState , useEffect } from 'react';
// import axios from 'axios'; // Thêm axios để gửi yêu cầu HTTP

// const languageOptions = [
//     { value: 'Vietnamese', label: 'Vietnamese', flag: '🇻🇳' },
//     { value: 'English', label: 'English', flag: '🇬🇧' },
//     { value: 'Spanish', label: 'Spanish', flag: '🇪🇸' },
//     { value: 'French', label: 'French', flag: '🇫🇷' },
//     { value: 'Korean', label: 'Korean', flag: '🇰🇷' },
//     { value: 'Japanese', label: 'Japanese', flag: '🇯🇵' }
// ];

// const years = [];
// for (let i = new Date().getFullYear(); i >= 1900; i--) {
//     years.push(i);
// }

// function CreateMovie() {
//     const [movieTitle, setMovieTitle] = useState('');
//     const [hours, setHours] = useState('');
//     const [languages, setLanguages] = useState([]);
//     const [year, setYear] = useState('');
//     const [image, setImage] = useState(null);
//     const [video, setVideo] = useState(null);
//     const [description, setDescription] = useState('');
//     const [category, setCategory] = useState('');
//     const [cast, setCast] = useState([]);
//     const [successMessage, setSuccessMessage] = useState('');
//     const [showSuccessModal, setShowSuccessModal] = useState(false); // State để kiểm soát việc hiển thị modal thành công
//     const [categoryOptions, setCategoryOptions] = useState([]); // State mới để lưu danh sách thể loại phim
//     const [errorMessage, setErrorMessage] = useState(''); // State mới để lưu thông báo lỗi

//     useEffect(() => {
//         // Khi component được mount, cập nhật danh sách thể loại phim từ Local Storage hoặc một nguồn dữ liệu khác
//         const storedCategories = JSON.parse(localStorage.getItem('categories')) || ['Action']; // Mặc định là 'Action' nếu không có dữ liệu
//         setCategoryOptions(storedCategories);
//     }, []);
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8081/categories');
//                 setCategoryOptions(response.data.map(category => category.name));
//             } catch (error) {
//                 console.error('Lỗi khi lấy danh sách thể loại phim:', error);
//             }
//         };

//         fetchCategories();
//     }, []);

//     const handleDrop = (e, type) => {
//         e.preventDefault();
//         const file = e.dataTransfer.files[0];
//         if (type === 'image' && file.type.startsWith('image/')) {
//             setImage(file);
//         } else if (type === 'video' && file.type.startsWith('video/')) {
//             setVideo(file);
//         }
//     };

//     const handleDragOver = (e) => {
//         e.preventDefault();
//     };

//     const handleFileChange = (e, type) => {
//         const file = e.target.files[0];
//         if (type === 'image' && file.type.startsWith('image/')) {
//             setImage(file);
//         } else if (type === 'video' && file.type.startsWith('video/')) {
//             setVideo(file);
//         }
//     };

//     const handleCastChange = (e) => {
// const files = e.target.files;
//         const newCast = Array.from(files).slice(0, 3);
//         setCast([...cast, ...newCast]);
//     };
   
//     const handleLanguageChange = (e) => {
//         const selectedLanguages = Array.from(e.target.selectedOptions).map(option => option.value);
//         setLanguages(selectedLanguages);
//     };

//     const handleTitleChange = (e) => {
//         const value = e.target.value;
//         const regex = /^[a-zA-ZÀ-ỹ\s]*$/u; // Chỉ cho phép chữ cái (bao gồm có dấu) và dấu cách
//         if (value === "" || regex.test(value)) {
//             setMovieTitle(value);
//         }
//     };

//     const handleHoursChange = (e) => {
//         const value = e.target.value;
//         const number = parseInt(value, 10);
//         if (value === "" || (number >= 0 && number <= 24)) {
//             setHours(value);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const movieExists = await axios.get(`http://localhost:8081/movies/search?title=${movieTitle}`);
    
//         if (movieExists.data.length > 0) {
//             setErrorMessage('Phim đã tồn tại');
//             setShowSuccessModal(true);
//         } else {
//             const formData = new FormData();
//             formData.append('titleImg', image);
//             formData.append('bgImg', image); // Sử dụng cùng ảnh cho bgImg để đơn giản
//             formData.append('previewImg', image); // Sử dụng cùng ảnh cho previewImg để đơn giản
//             formData.append('video', video);
//             formData.append('title', movieTitle);
//             formData.append('year', year);
//             formData.append('date', new Date().toISOString().split('T')[0]); 
//             formData.append('ageLimit', 'PG-13'); 
//             formData.append('length', hours);
//             formData.append('language', languages.join(', '));
//             formData.append('category_id', category); 
//             formData.append('type', 'Movie'); 
//             formData.append('description', description);
//             formData.append('active', 1); 

//             try {
//                 const response = await axios.post('http://localhost:8081/movies', formData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 });
    
//                 if (response.status === 201) {
//                     setSuccessMessage('Thêm thành công');
//                     setCategory('');
//                     setMovieTitle('');
//                     setHours('');
//                     setLanguages([]);
//                     setYear('');
//                     setImage(null);
//                     setVideo(null);
//                     setDescription('');
//                     setCast([]);
//                     setShowSuccessModal(true);
//                 }
//             } catch (error) {
//                 console.error('Lỗi khi thêm phim:', error);
//                 setErrorMessage('Lỗi khi thêm phim');
//                 console.log(error);
// setShowSuccessModal(true);
//             }
//         }
//     };

//     const handleCloseSuccessModal = () => {
//         setShowSuccessModal(false);
//         setErrorMessage('');
//         setSuccessMessage('');
//     };

//     return (
//         <div>
//             <h1>Create Movie</h1>
//             {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
//             {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
//             <form onSubmit={handleSubmit}>
//                 <div className="row">
//                     <div className="col">
//                         <label htmlFor="movie-title">Tên phim:</label>
//                         <input style={{ color: 'white' }} type="text" id="movie-title" value={movieTitle} onChange={handleTitleChange} />
//                     </div>
//                     <div className="col">
//                         <label htmlFor="hours">Giờ:</label>
//                         <input type="number" id="hours" value={hours} onChange={handleHoursChange} />
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="col">
//                         <label htmlFor="languages">Ngôn ngữ sử dụng:</label>
//                         <select id="languages" multiple={true} value={languages} onChange={handleLanguageChange} className="dropdown1">
//                             {languageOptions.map((lang) => (
//                                 <option key={lang.value} value={lang.value}>
//                                     {lang.flag} {lang.label}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="col">
//                         <label htmlFor="year">Năm phát hành:</label>
//                         <select id="year" value={year} onChange={(e) => setYear(e.target.value)} className="dropdown1">
//                             <option value="">Chọn năm</option>
//                             {years.map((year) => (
//                                 <option key={year} value={year}>{year}</option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>
//                 <div>
//                     <label htmlFor="image">Hình ảnh với tiêu đề:</label>
//                     <div
//                         id="image-drop"
//                         onDrop={(e) => handleDrop(e, 'image')}
//                         onDragOver={handleDragOver}
//                         onClick={() => document.getElementById('image-input').click()}
//                         style={{
//                             width: '100%',
//                             height: '200px',
//                             border: '2px dashed #ccc',
//                             borderRadius: '5px',
//                             textAlign: 'center',
//                             lineHeight: '200px',
//                             fontSize: '16px',
// position: 'relative',
//                             cursor: 'pointer',
//                         }}
//                     >
//                         {image ? (
//                             <img
//                                 src={URL.createObjectURL(image)}
//                                 alt="Hình xem trước"
//                                 style={{
//                                     maxWidth: '100%',
//                                     maxHeight: '100%',
//                                     borderRadius: '5px',
//                                 }}
//                             />
//                         ) : (
//                             <div style={{ color: 'white' }}>Kéo thả hình ảnh của bạn vào đây</div>
//                         )}
//                     </div>
//                     <input
//                         id="image-input"
//                         type="file"
//                         accept="image/*"
//                         style={{ display: 'none' }}
//                         onChange={(e) => handleFileChange(e, 'image')}
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="description">Mô tả phim:</label>
//                     <textarea style={{ width: '100%', height: '200px' }} id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
//                 </div>
//                 <div style={{ width: '100%' }}>
//                     <label htmlFor="category" style={{ color: 'white' }}>Thể loại phim:</label>
//                     <select
//                     id="category"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     className="dropdown2"
//                 >
//                     {/* Sử dụng danh sách thể loại phim từ state */}
//                     {categoryOptions.map((cat, index) => (
//                         <option key={index} value={cat}>{cat}</option>
//                     ))}
//                 </select>
//                 </div>
//                 <div>
//                     <label htmlFor="video">Video phim:</label>
//                     <div
//                         id="video-drop"
//                         onDrop={(e) => handleDrop(e, 'video')}
//                         onDragOver={handleDragOver}
//                         onClick={() => document.getElementById('video-input').click()}
//                         style={{
//                             width: '100%',
//                             height: '200px',
//                             border: '2px dashed #ccc',
//                             borderRadius: '5px',
//                             textAlign: 'center',
//                             lineHeight: '200px',
//                             fontSize: '16px',
//                             position: 'relative',
//                             cursor: 'pointer',
//                             marginTop: '20px',
//                         }}
//                     >
//                         {video ? (
// <video
//                                 src={URL.createObjectURL(video)}
//                                 controls
//                                 style={{
//                                     maxWidth: '100%',
//                                     maxHeight: '100%',
//                                     borderRadius: '5px',
//                                 }}
//                             />
//                         ) : (
//                             <div style={{ color: 'white' }}>Kéo thả video của bạn vào đây</div>
//                         )}
//                     </div>
//                     <input
//                         id="video-input"
//                         type="file"
//                         accept="video/*"
//                         style={{ display: 'none' }}
//                         onChange={(e) => handleFileChange(e, 'video')}
//                     />
//                 </div>

//                 <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                     <div style={{ width: '50%', boxSizing: 'border-box', padding: '10px' }}>
//                         <label htmlFor="cast" style={{ border: '2px dashed red', padding: '10px', cursor: 'pointer' }}>
//                             THÊM DIỄN VIÊN:
//                             <input type="file" id="cast" onChange={handleCastChange} multiple style={{ display: 'none' }} />
//                         </label>
//                     </div>
//                     <div style={{ width: '50%', display: 'flex', flexWrap: 'wrap' }}>
//                         {cast && cast.map((file, index) => (
//                             <img key={index} src={URL.createObjectURL(file)} alt={`Diễn viên ${index + 1}`} className="cast-image" style={{ width: 'calc(33.33% - 50px)', height: '150px', marginRight: '10px', marginBottom: '10px', objectFit: 'cover' }} />
//                         ))}
//                     </div>
//                 </div>

//                 <div>
//                     <input type="submit" value="Xuất bản phim" style={{ backgroundColor: "red", width: "100%", height: "60px" }} />
//                 </div>
//             </form>
//             {showSuccessModal && (
//                 <SuccessModal message={successMessage || errorMessage} onClose={handleCloseSuccessModal} />
//             )}
//         </div>
//     );
// }

// function SuccessModal({ message, onClose }) {
//     return (
//         <div className="success-modal-overlay">
//             <div className="success-modal">
//                 <div className="modal-header">
//                     <h3 style={{ color: 'white', fontStyle: 'bold', margin: 'auto' }}>{message}</h3>
//                 </div>
//                 <div className="modal-body">
//                     <button onClick={onClose} style={{ backgroundColor: '#fc1c03', color: 'white', padding: '8px', border: 'none', cursor: 'pointer' }}>
//                         Close
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CreateMovie;