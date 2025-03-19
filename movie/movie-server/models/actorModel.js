const { connection } = require('../config/database');

const getAllActors = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM actors';
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getActorById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM actors WHERE actor_id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

const addActor = (actorData) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO actors (name, profile_img) VALUES (?, ?)';
    connection.query(query, actorData, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const deleteActor = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM actors WHERE actor_id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const updateActor = (id, actorData) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE actors SET name = ?, profile_img = ? WHERE actor_id = ?';
    connection.query(query, [...actorData, id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const addActorToMovie = (movieId, actorId) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO movie_actors (movie_id, actor_id) VALUES (?, ?)';
    connection.query(query, [movieId, actorId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = { getAllActors, getActorById, addActor, deleteActor, updateActor, addActorToMovie };