const path = require('path');
const { getAllMovies, searchMovies, getMovieById, addMovie, deleteMovie, updateMovie } = require('../models/movieModel');

const getMovies = async (req, res) => {
  try {
    const movies = await getAllMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).send('Error fetching movies');
  }
};

const searchMoviesByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const movies = await searchMovies(title);
    res.json(movies);
  } catch (error) {
    res.status(500).send('Error searching movies');
  }
};

const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await getMovieById(id);
    if (!movie) return res.status(404).send('Movie not found');
    res.json(movie);
  } catch (error) {
    res.status(500).send('Error fetching movie details');
  }
};

const addNewMovie = async (req, res) => {
  try {
    const { title, year, description, language, category_id } = req.body;
    const imageFile = req.files['image'] ? req.files['image'][0] : null;
    const videoFile = req.files['video'] ? req.files['video'][0] : null;

    const titleImg = imageFile ? path.basename(imageFile.filename) : '';
    const bgImg = imageFile ? path.basename(imageFile.filename) : '';
    const previewImg = imageFile ? path.basename(imageFile.filename) : '';
    const videoUrl = videoFile ? path.basename(videoFile.filename) : '';
    const date = '04th August';
    const ageLimit = '16+';
    const length = '1h 56min';
    const type = 'coming';
    const active = 0;

    await addMovie([titleImg, bgImg, previewImg, videoUrl, title, year, date, ageLimit, length, language, category_id, type, description, active]);
    res.status(201).send('Movie added successfully');
  } catch (error) {
    res.status(500).send('Error adding movie');
  }
};

const deleteMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteMovie(id);
    if (result.affectedRows === 0) return res.status(404).send('Movie not found');
    res.status(200).send('Movie deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting movie');
  }
};

const updateMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, year, date, ageLimit, length, language, category_id, type, description, active } = req.body;
    await updateMovie(id, [title, year, date, ageLimit, length, language, category_id, type, description, active]);
    res.status(200).send('Movie updated successfully');
  } catch (error) {
    res.status(500).send('Error updating movie');
  }
};

module.exports = { getMovies, searchMoviesByTitle, getMovieDetails, addNewMovie, deleteMovieById, updateMovieDetails };