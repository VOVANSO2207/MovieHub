const { connection } = require('../config/database');

const getAllMovies = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT m._id, m.titleImg, m.bgImg, m.previewImg, m.video, m.title, m.year, m.date, m.ageLimit, m.length, m.language, m.category_id, c.name as category_name, m.type, m.description, m.active 
      FROM movies m
      JOIN categories c ON m.category_id = c.category_id
    `;
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const searchMovies = (title) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT m._id, m.titleImg, m.bgImg, m.previewImg, m.video, m.title, m.year, m.date, m.ageLimit, m.length, m.language, m.category_id, c.name as category_name, m.type, m.description, m.active 
      FROM movies m
      JOIN categories c ON m.category_id = c.category_id
      WHERE m.title LIKE ?
    `;
    connection.query(query, [`%${title}%`], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getMovieById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT m._id, m.titleImg, m.bgImg, m.previewImg, m.video, m.title, m.year, m.date, m.ageLimit, m.length, m.language, m.category_id, c.name as category_name, m.type, m.description, m.active
      FROM movies m
      JOIN categories c ON m.category_id = c.category_id
      WHERE m._id = ?
    `;
    connection.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

const addMovie = (movieData) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO movies (titleImg, bgImg, previewImg, video, title, year, date, ageLimit, length, language, category_id, type, description, active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    connection.query(query, movieData, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const deleteMovie = (id) => {
  return new Promise((resolve, reject) => {
    const deleteCommentsQuery = 'DELETE FROM comments WHERE movie_id = ?';
    connection.query(deleteCommentsQuery, [id], (err) => {
      if (err) return reject(err);
      const deleteMovieQuery = 'DELETE FROM movies WHERE _id = ?';
      connection.query(deleteMovieQuery, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  });
};

const updateMovie = (id, movieData) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE movies
      SET title = ?, year = ?, date = ?, ageLimit = ?, length = ?, language = ?, category_id = ?, type = ?, description = ?, active = ?
      WHERE _id = ?
    `;
    connection.query(query, [...movieData, id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = { getAllMovies, searchMovies, getMovieById, addMovie, deleteMovie, updateMovie };