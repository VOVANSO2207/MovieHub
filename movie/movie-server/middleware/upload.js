const multer = require('multer');
const path = require('path');
const fs = require('fs');

const movieStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = '../public/assets/movies/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const actorStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../public/assets/images/');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadMovies = multer({ storage: movieStorage });
const uploadActors = multer({ storage: actorStorage });

module.exports = { uploadMovies, uploadActors };