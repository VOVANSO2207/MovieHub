const { connection } = require('../config/database');

const getCommentsByMovieId = (movieId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT c.comment_id, c.user_id, c.movie_id, c.parent_comment_id, c.content, c.created_at, u.username, u.avatar
      FROM comments c
      JOIN users u ON c.user_id = u.user_id
      WHERE c.movie_id = ?
    `;
    connection.query(query, [movieId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const addComment = (commentData) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO comments (user_id, movie_id, parent_comment_id, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(query, commentData, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const updateComment = (id, commentData) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE comments SET user_id = ?, movie_id = ?, parent_comment_id = ?, content = ?, updated_at = ? WHERE comment_id = ?';
    connection.query(query, [...commentData, id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const deleteComment = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM comments WHERE comment_id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const likeComment = (userId, commentId) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO likeComments (user_id, comment_id) VALUES (?, ?)`;
    connection.query(query, [userId, commentId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const unlikeComment = (userId, commentId) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM likeComments WHERE user_id = ? AND comment_id = ?`;
    connection.query(query, [userId, commentId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getLikesCount = (commentId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) as likes_count FROM likeComments WHERE comment_id = ?';
    connection.query(query, [commentId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0].likes_count);
    });
  });
};

module.exports = { getCommentsByMovieId, addComment, updateComment, deleteComment, likeComment, unlikeComment, getLikesCount };