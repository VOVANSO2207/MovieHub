const { connection } = require('../config/database');

const getAllCategories = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM categories';
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const addCategory = (name) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO categories (name) VALUES (?)';
    connection.query(query, [name], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const deleteCategory = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM categories WHERE category_id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const updateCategory = (id, name) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE categories SET name = ? WHERE category_id = ?';
    connection.query(query, [name, id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = { getAllCategories, addCategory, deleteCategory, updateCategory };