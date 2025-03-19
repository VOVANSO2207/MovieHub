const express = require('express');
const router = express.Router();
const { uploadMovies } = require('../middleware/upload');
const { getMovies, searchMoviesByTitle, getMovieDetails, addNewMovie, deleteMovieById, updateMovieDetails } = require('../controllers/movieController');

router.get('/', getMovies);
router.get('/search', searchMoviesByTitle);
router.get('/:id', getMovieDetails);
router.post('/', uploadMovies.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), addNewMovie);
router.delete('/:id', deleteMovieById);
router.put('/:id', updateMovieDetails);

module.exports = router;