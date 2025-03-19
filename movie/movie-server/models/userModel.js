const { connection } = require('../config/database');

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getUsernameById = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT username FROM users WHERE user_id = ?';
    connection.query(query, [userId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] ? results[0].username : 'Unknown');
    });
  });
};

module.exports = { getAllUsers, getUsernameById };