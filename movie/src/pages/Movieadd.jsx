import React, { useState , useEffect } from 'react';

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

function CreateMovie() {
    const [movieTitle, setMovieTitle] = useState('');
    const [hours, setHours] = useState('');
    const [languages, setLanguages] = useState([]);
    const [year, setYear] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [cast, setCast] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State để kiểm soát việc hiển thị modal thành công
    const [categoryOptions, setCategoryOptions] = useState([]); // State mới để lưu danh sách thể loại phim
    const [errorMessage, setErrorMessage] = useState(''); // State mới để lưu thông báo lỗi

    useEffect(() => {
        // Khi component được mount, cập nhật danh sách thể loại phim từ Local Storage hoặc một nguồn dữ liệu khác
        const storedCategories = JSON.parse(localStorage.getItem('categories')) || ['Action']; // Mặc định là 'Action' nếu không có dữ liệu
        setCategoryOptions(storedCategories);
    }, []);

    const handleDrop = (e, type) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (type === 'image' && file.type.startsWith('image/')) {
            setImage(URL.createObjectURL(file));
        } else if (type === 'video' && file.type.startsWith('video/')) {
            setVideo(URL.createObjectURL(file));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (type === 'image' && file.type.startsWith('image/')) {
            setImage(URL.createObjectURL(file));
        } else if (type === 'video' && file.type.startsWith('video/')) {
            setVideo(URL.createObjectURL(file));
        }
    };

    const handleCastChange = (e) => {
        const files = e.target.files;
        const newCast = Array.from(files).slice(0, 3);
        setCast([...cast, ...newCast]);
    };
   
    const handleLanguageChange = (e) => {
        const selectedLanguages = Array.from(e.target.selectedOptions).map(option => option.value);
        setLanguages(selectedLanguages);
    };

    const handleTitleChange = (e) => {
        const value = e.target.value;
        const regex = /^[a-zA-ZÀ-ỹ\s]*$/u; // Chỉ cho phép chữ cái (bao gồm có dấu) và dấu cách
        if (value === "" || regex.test(value)) {
            setMovieTitle(value);
        }
    };

    const handleHoursChange = (e) => {
        const value = e.target.value;
        const number = parseInt(value, 10);
        if (value === "" || (number >= 0 && number <= 24)) {
            setHours(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const movies = JSON.parse(localStorage.getItem('movies')) || [];
        const movieExists = movies.some(movie => movie.title === movieTitle);
    
        if (movieExists) {
            setErrorMessage('Phim đã tồn tại');
            setShowSuccessModal(true);
        } else {
            const movie = {
                title: movieTitle,
                hours: hours,
                languages: languages.join(', '),
                year: year,
                image: image,
                video: video,
                description: description,
                category: category,
                cast: cast.map(file => URL.createObjectURL(file))
            };
    
            movies.push(movie);
            localStorage.setItem('movies', JSON.stringify(movies));
    
            setSuccessMessage('Thêm thành công');
    
            // Cập nhật state category về trạng thái mặc định
            setCategory('');
    
            // Reset các trường khác về trạng thái mặc định
            setMovieTitle('');
            setHours('');
            setLanguages([]);
            setYear('');
            setImage(null);
            setVideo(null);
            setDescription('');
            setCast([]);
            setShowSuccessModal(true);
        }
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
        setErrorMessage('');
        setSuccessMessage('');
    };

    return (
        <div>
            <h1>Create Movie</h1>
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        <label htmlFor="movie-title">Tên phim:</label>
                        <input style={{ color: 'white' }} type="text" id="movie-title" value={movieTitle} onChange={handleTitleChange} />
                    </div>
                    <div className="col">
                        <label htmlFor="hours">Giờ:</label>
                        <input type="number" id="hours" value={hours} onChange={handleHoursChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label htmlFor="languages">Ngôn ngữ sử dụng:</label>
                        <select id="languages" multiple={true} value={languages} onChange={handleLanguageChange} className="dropdown1">
                            {languageOptions.map((lang) => (
                                <option key={lang.value} value={lang.value}>
                                    {lang.flag} {lang.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="year">Năm phát hành:</label>
                        <select id="year" value={year} onChange={(e) => setYear(e.target.value)} className="dropdown1">
                            <option value="">Chọn năm</option>
                            {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="image">Hình ảnh với tiêu đề:</label>
                    <div
                        id="image-drop"
                        onDrop={(e) => handleDrop(e, 'image')}
                        onDragOver={handleDragOver}
                        onClick={() => document.getElementById('image-input').click()}
                        style={{
                            width: '100%',
                            height: '200px',
                            border: '2px dashed #ccc',
                            borderRadius: '5px',
                            textAlign: 'center',
                            lineHeight: '200px',
                            fontSize: '16px',
                            position: 'relative',
                            cursor: 'pointer',
                        }}
                    >
                        {image ? (
                            <img
                                src={image}
                                alt="Hình xem trước"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    borderRadius: '5px',
                                }}
                            />
                        ) : (
                            <div style={{ color: 'white' }}>Kéo thả hình ảnh của bạn vào đây</div>
                        )}
                    </div>
                    <input
                        id="image-input"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileChange(e, 'image')}
                    />
                </div>

                <div>
                    <label htmlFor="description">Mô tả phim:</label>
                    <textarea style={{ width: '100%', height: '200px' }} id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div style={{ width: '100%' }}>
                    <label htmlFor="category" style={{ color: 'white' }}>Thể loại phim:</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="dropdown2"
                    >
                        {/* Sử dụng danh sách thể loại phim từ state */}
                        {categoryOptions.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="video">Video phim:</label>
                    <div
                        id="video-drop"
                        onDrop={(e) => handleDrop(e, 'video')}
                        onDragOver={handleDragOver}
                        onClick={() => document.getElementById('video-input').click()}
                        style={{
                            width: '100%',
                            height: '200px',
                            border: '2px dashed #ccc',
                            borderRadius: '5px',
                            textAlign: 'center',
                            lineHeight: '200px',
                            fontSize: '16px',
                            position: 'relative',
                            cursor: 'pointer',
                            marginTop: '20px',
                        }}
                    >
                        {video ? (
                            <video
                                src={video}
                                controls
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    borderRadius: '5px',
                                }}
                            />
                        ) : (
                            <div style={{ color: 'white' }}>Kéo thả video của bạn vào đây</div>
                        )}
                    </div>
                    <input
                        id="video-input"
                        type="file"
                        accept="video/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileChange(e, 'video')}
                    />
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div style={{ width: '50%', boxSizing: 'border-box', padding: '10px' }}>
                        <label htmlFor="cast" style={{ border: '2px dashed red', padding: '10px', cursor: 'pointer' }}>
                            THÊM DIỄN VIÊN:
                            <input type="file" id="cast" onChange={handleCastChange} multiple style={{ display: 'none' }} />
                        </label>
                    </div>
                    <div style={{ width: '50%', display: 'flex', flexWrap: 'wrap' }}>
                        {cast && cast.map((file, index) => (
                            <img key={index} src={URL.createObjectURL(file)} alt={`Diễn viên ${index + 1}`} className="cast-image" style={{ width: 'calc(33.33% - 50px)', height: '150px', marginRight: '10px', marginBottom: '10px', objectFit: 'cover' }} />
                        ))}
                    </div>
                </div>

                <div>
                    <input type="submit" value="Xuất bản phim" style={{ backgroundColor: "red", width: "100%", height: "60px" }} />
                </div>
            </form>
            {showSuccessModal && (
                <SuccessModal message={successMessage || errorMessage} onClose={handleCloseSuccessModal} />
            )}
        </div>
    );
}

function SuccessModal({ message, onClose }) {
    return (
        <div className="success-modal-overlay">
            <div className="success-modal">
                <div className="modal-header">
                    <h3 style={{ color: 'white', fontStyle: 'bold', margin: 'auto' }}>{message}</h3>
                </div>
                <div className="modal-body">
                    <button onClick={onClose} style={{ backgroundColor: '#fc1c03', color: 'white', padding: '8px', border: 'none', cursor: 'pointer' }}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateMovie;
