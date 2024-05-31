const express = require('express');
const mysql = require('mysql');
// const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'moviedb'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// API endpoint to get movies data

app.get('/movies', (req, res) => {
    const query = `
      SELECT m._id, m.titleImg, m.bgImg, m.previewImg, m.video, m.title, m.year, m.date, m.ageLimit, m.length,m.language, m.category_id, c.name as category_name, m.type, m.description, m.active 
      FROM movies m
      JOIN categories c ON m.category_id = c.category_id
    `;
    connection.query(query, (error, results) => {
      if (error) throw error; 
      res.json(results);
    });
  });
// API endpoint to get categories data
app.get('/categories', (req, res) => {
    const query = 'SELECT * FROM categories';
    connection.query(query, (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
  // API endpoint to add a new category
  app.post('/categories', (req, res) => {
    const { name } = req.body;
    const query = 'INSERT INTO categories (name) VALUES (?)';
    connection.query(query, [name], (error, results) => {
      if (error) {
        console.error('Lỗi khi thêm danh mục:', error);
        res.status(500).send('Lỗi khi thêm danh mục');
        return;
      }
      res.status(201).json({ category_id: results.insertId, name });
    });
  });
  
  // API endpoint to delete a category
app.delete('/categories/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM categories WHERE category_id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error deleting category:', error);
      res.status(500).send('Error deleting category');
      return;
    }
    res.status(200).send('Category deleted successfully');
  });
});

// API endpoint to update a category
app.put('/categories/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const query = 'UPDATE categories SET name = ? WHERE category_id = ?';
  connection.query(query, [name, id], (error, results) => {
    if (error) {
      console.error('Error updating category:', error);
      res.status(500).send('Error updating category');
      return;
    }
    res.status(200).send('Category updated successfully');
  });
});

  // API endpoint to get user data
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});
// API endpoint to search movies by title
app.get('/movies/search', (req, res) => {
  const searchTerm = req.query.title;
  const query = `
    SELECT m._id, m.titleImg, m.bgImg, m.previewImg, m.video, m.title, m.year, m.date, m.ageLimit, m.length,m.language, m.category_id, c.name as category_name, m.type, m.description, m.active 
    FROM movies m
    JOIN categories c ON m.category_id = c.category_id
    WHERE m.title LIKE ?
  `;
  connection.query(query, [`%${searchTerm}%`], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});
// API endpoint to get movie details by ID
  app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movieQuery = `
    SELECT m._id, m.titleImg, m.bgImg, m.previewImg, m.video, m.title, m.year, m.date, m.ageLimit, m.length,m.language, m.category_id, c.name as category_name, m.type, m.description, m.active
    FROM movies m
    JOIN categories c ON m.category_id = c.category_id
    WHERE m._id = ?
  `;

  const actorsQuery = `
    SELECT a.actor_id, a.name, a.profile_img
    FROM actors a
    JOIN movie_actors ma ON a.actor_id = ma.actor_id
    WHERE ma.movie_id = ?
  `;

  connection.query(movieQuery, [id], (movieError, movieResults) => {
    if (movieError) {
      console.error('Error fetching movie details:', movieError);
      res.status(500).send('Error fetching movie details');
      return;
    }
    if (movieResults.length === 0) {
      res.status(404).send('Movie not found');
      return;
    }

    connection.query(actorsQuery, [id], (actorsError, actorsResults) => {
      if (actorsError) {
        console.error('Error fetching actors:', actorsError);
        res.status(500).send('Error fetching actors');
        return;
      }

      const movie = movieResults[0];
      movie.actors = actorsResults;
      res.json(movie);
    });
  });
});
// API endpoint to get all comments
app.get('/comments', (req, res) => {
  const query = 'SELECT * FROM comments';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching comments:', error);
      res.status(500).send('Error fetching comments');
      return;
    }
    res.json(results);
  });
});
// API endpoint to add a new comment
app.post('/comments', (req, res) => {
  const { user_id, movie_id, parent_comment_id, content } = req.body;
  const query = 'INSERT INTO comments (user_id, movie_id, parent_comment_id, content) VALUES (?, ?, ?, ?)';
  connection.query(query, [user_id, movie_id, parent_comment_id, content], (error, results) => {
    if (error) {
      console.error('Error adding comment:', error);
      res.status(500).send('Error adding comment');
      return;
    }
    res.status(201).json({ comment_id: results.insertId, user_id, movie_id, parent_comment_id, content });
  });
});
// API endpoint to update a comment
app.put('/comments/:id', (req, res) => {
  const comment_id = req.params.id;
  const { user_id, movie_id, parent_comment_id, content } = req.body;
  const query = 'UPDATE comments SET user_id = ?, movie_id = ?, parent_comment_id = ?, content = ? WHERE comment_id = ?';
  connection.query(query, [user_id, movie_id, parent_comment_id, content, comment_id], (error, results) => {
    if (error) {
      console.error('Error updating comment:', error);
      res.status(500).send('Error updating comment');
      return;
    }
    res.status(200).send('Comment updated successfully');
  });
});
// API endpoint to delete a comment
app.delete('/comments/:id', (req, res) => {
  const comment_id = req.params.id;
  const query = 'DELETE FROM comments WHERE comment_id = ?';
  connection.query(query, [comment_id], (error, results) => {
    if (error) {
      console.error('Error deleting comment:', error);
      res.status(500).send('Error deleting comment');
      return;
    }
    res.status(200).send('Comment deleted successfully');
  });
});


// Start the server

app.listen(8081, () => {
  console.log(`Server is listening on port`);
});
