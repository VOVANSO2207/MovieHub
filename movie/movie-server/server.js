const express = require('express');
const mysql = require('mysql');
// const bodyParser = require('body-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
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
  // API endpoint add movie 
  // API endpoint to add a new movie
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: true }));

  // Cấu hình multer để lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const uploadDir = '../public/assets/movies/';
      if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
      }
      cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

app.post('/movies', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), (req, res) => {
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

  const movieQuery = `
      INSERT INTO movies (titleImg, bgImg, previewImg, video, title, year, date, ageLimit, length, language, category_id, type, description, active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(movieQuery, [titleImg, bgImg, previewImg, videoUrl, title, year, date, ageLimit, length, language, category_id, type, description, active], (movieError, movieResults) => {
      if (movieError) {
          console.error('Error inserting movie: ', movieError);
          res.status(500).send('Error inserting movie');
          return;
      }

      res.status(201).send('Movie added successfully');
  });
});

// app.post('/movies', (req, res) => {
//   const { titleImg, bgImg, previewImg, video, title, year, date, ageLimit, length, language, category_id, type, description, active } = req.body;
//   // console.log('Received data movie ha :', {
//   //   titleImg, bgImg, previewImg, video, title, year, date, ageLimit, length, language, category_id, type, description, active
//   // });
//   const query = `
//     INSERT INTO movies (titleImg, bgImg, previewImg, video, title, year, date, ageLimit, length, language, category_id, type, description, active) 
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;
//   const values = [titleImg, bgImg, previewImg, video, title, year, date, ageLimit, length, language, category_id, type, description, active];
  
//   connection.query(query, values, (error, results) => {
//     if (error) {
//       console.error('Error adding movie:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     } else {
//       res.status(200).json({ message: 'Movie added successfully' });
//     }
//   });
// });

  // API endpoint to add a new movie
// app.post('/movies',(req, res) => {
//   const {
//     titleImg,
//     bgImg,
//     previewImg,
//     video,
//     title,
//     year,
//     date,
//     ageLimit,
//     length,
//     language,
//     category_id,
//     type,
//     description,
//     active
//   } = req.body;
//   // const file = req.file;
//     // Kiểm tra các giá trị đầu vào
//     if (!title || !year || !date || !length || !language || !category_id || !type || !description || !active) {
//       return res.status(400).send('Thiếu thông tin bắt buộc.');
//     }
//   const query = `
//     INSERT INTO movies (
//       titleImg, bgImg, previewImg, video, title, year, date, ageLimit, length, language, category_id, type, description, active
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   const values = [
//     titleImg,
//     bgImg,
//     previewImg,
//     video,
//     title,
//     year,
//     date,
//     ageLimit,
//     length,
//     language,
//     category_id,
//     type,
//     description,
//     active
//   ];

//   connection.query(query, values, (error, results) => {
//     if (error) {
//       console.error('Lỗi khi thêm phim:', error);
//       res.status(500).send('Lỗi khi thêm phim');
//       return;
//     }
//     res.status(201).json({_id: results.insertId, ...req.body });
//   });
// });

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
    SELECT m._id, m.titleImg, m.bgImg, m.previewImg, m.video, m.title, m.year, m.date, m.ageLimit, m.length, m.language, m.category_id, c.name as category_name, m.type, m.description, m.active
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

  const commentsQuery = `
    SELECT c.comment_id, c.user_id, c.movie_id,c.parent_comment_id,c.content, c.created_at, u.username, u.avatar
    FROM comments c
    JOIN users u ON c.user_id = u.user_id
    WHERE c.movie_id = ?
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

      connection.query(commentsQuery, [id], (commentsError, commentsResults) => {
        if (commentsError) {
          console.error('Error fetching comments:', commentsError);
          res.status(500).send('Error fetching comments');
          return;
        }

        const movie = movieResults[0];
        movie.actors = actorsResults;
        movie.comments = commentsResults;

        res.json(movie);
      });
    });
  });
});
// API endpoint to get all comments
app.get('/comments/:movieId', (req, res) => {
  const movieId = req.params.movieId;
  const query = 'SELECT * FROM comments WHERE movie_id = ?';
  connection.query(query, [movieId], (error, results) => {
    if (error) {
      console.error('Error fetching comments:', error);
      res.status(500).send('Error fetching comments');
      return;
    }
    res.json(results);
  });
});
// API endpoint to add a new comment
// Endpoint to add a comment

app.post('/addComment', (req, res) => {
  const { user_id, movie_id, parent_comment_id, content } = req.body;
  const created_at = new Date();
  const updated_at = new Date();

  const query = `INSERT INTO comments (user_id, movie_id, parent_comment_id, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`;

  connection.query(query, [user_id, movie_id, parent_comment_id, content, created_at, updated_at], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }

    // Retrieve user information from the database based on user_id
    const getUserQuery = 'SELECT username FROM users WHERE user_id = ?';
    connection.query(getUserQuery, user_id, (getUserErr, userResult) => {
      if (getUserErr) {
        console.error('Database error:', getUserErr);
        return res.status(500).json({ message: 'Database error', error: getUserErr });
      }

      const username = userResult[0] ? userResult[0].username : 'Unknown'; // If user not found, set username to 'Unknown'

      res.status(200).json({ message: 'Comment added successfully', results, username });
    });
  });
});


// API endpoint to update a comment
app.put('/updateComment/:id', (req, res) => {
  const comment_id = req.params.id;
  const { user_id, movie_id, parent_comment_id, content, updated_at } = req.body; // Thêm updated_at từ request body
  const query = 'UPDATE comments SET user_id = ?, movie_id = ?, parent_comment_id = ?, content = ?, updated_at = ? WHERE comment_id = ?'; // Thêm updated_at vào query
  connection.query(query, [user_id, movie_id, parent_comment_id, content, updated_at, comment_id], (error, results) => {
    if (error) {
      console.error('Error updating comment:', error);
      res.status(500).json({ message: 'Error updating comment', error });
      return;
    }
    res.status(200).json({ message: 'Comment updated successfully' });
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

app.post('/likeComment', (req, res) => {
    const { user_id, comment_id } = req.body;

    const query = `INSERT INTO likeComments (user_id, comment_id) VALUES (?, ?)`;

    connection.query(query, [user_id, comment_id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        // Trả về số lượt thích hiện tại
        connection.query('SELECT COUNT(*) as likes_count FROM likeComments WHERE comment_id = ?', [comment_id], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Database error', error: err });
            }
            res.status(200).json({ message: 'Like added successfully', likes_count: results[0].likes_count });
        });
    });
});

app.delete('/unlikeComment/:comment_id', (req, res) => {
    const { user_id } = req.body;
    const { comment_id } = req.params;

    const query = `DELETE FROM likeComments WHERE user_id = ? AND comment_id = ?`;
    
    connection.query(query, [user_id, comment_id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        // Trả về số lượt thích hiện tại
        connection.query('SELECT COUNT(*) as likes_count FROM likeComments WHERE comment_id = ?', [comment_id], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Database error', error: err });
            }
            res.status(200).json({ message: 'Like removed successfully', likes_count: results[0].likes_count });
        });
    });
});

// API endpoint to add a new actor
// app.post('/actors', (req, res) => {
//   const { name, profile_img } = req.body;

//   const actorQuery = 'INSERT INTO actors (name, profile_img) VALUES (?, ?)';
  
//   connection.query(actorQuery, [name, profile_img], (error, results) => {
//     if (error) {
//       console.error('Error adding actor:', error);
//       res.status(500).send('Error adding actor');
//       return;
//     }

//     res.status(201).json({ actor_id: results.insertId, name, profile_img });
//   });
// });

// API DELETE MOVIES 
//API endpoint to delete a movie by ID
app.delete('/movies/:id', (req, res) => {
  const { id } = req.params;

  // First, delete the related comments
  const deleteCommentsQuery = 'DELETE FROM comments WHERE movie_id = ?';
  connection.query(deleteCommentsQuery, [id], (commentsError) => {
    if (commentsError) {
      console.error('Error deleting comments:', commentsError);
      res.status(500).send('Error deleting comments');
      return;
    }

    // Then, delete the movie
    const deleteMovieQuery = 'DELETE FROM movies WHERE _id = ?';
    connection.query(deleteMovieQuery, [id], (movieError, movieResults) => {
      if (movieError) {
        console.error('Error deleting movie:', movieError);
        res.status(500).send('Error deleting movie');
        return;
      }

      if (movieResults.affectedRows === 0) {
        res.status(404).send('Movie not found');
        return;
      }

      res.status(200).send('Movie deleted successfully');
    });
  });
});


// API endpoint to get movie details by ID
app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movieQuery = `
    SELECT *
    FROM movies
    WHERE _id = ?
  `;

  connection.query(movieQuery, [id], (error, results) => {
    if (error) {
      console.error('Error fetching movie details:', error);
      res.status(500).send('Error fetching movie details');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Movie not found');
      return;
    }

    res.json(results[0]);
  });
});

// API endpoint to update movie details
app.put('/movies/:id', (req, res) => {
  const { id } = req.params;
  const { title, year, date, ageLimit, length, language, category_id, type, description, active } = req.body;

  const movieUpdateQuery = `
    UPDATE movies
    SET title = ?, year = ?, date = ?, ageLimit = ?, length = ?, language = ?, category_id = ?, type = ?, description = ?, active = ?
    WHERE _id = ?
  `;

  connection.query(movieUpdateQuery, [title, year, date, ageLimit, length, language, category_id, type, description, active, id], (error, results) => {
    if (error) {
      console.error('Error updating movie details:', error);
      res.status(500).send('Error updating movie details');
      return;
    }

    res.status(200).send('Movie details updated successfully');
  });
}); 
// API ADD ACtors 
app.get('/actors', (req, res) => {
  const query = 'SELECT * FROM actors';
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});
const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
      const uploadDir1 = path.join(__dirname, '../public/assets/images/');
      if (!fs.existsSync(uploadDir1)) {
          fs.mkdirSync(uploadDir1, { recursive: true });
      }
      cb(null, uploadDir1);
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload1 = multer({ storage: storage1 });
app.post('/actors', upload1.fields([{ name: 'profile_img', maxCount: 1 }]), (req, res) => {
  const { name } = req.body;
  const profileImgFile = req.files['profile_img'] ? req.files['profile_img'][0] : null;
  
  // Kiểm tra xem có tên diễn viên được cung cấp không
  if (!name) {
    return res.status(400).send('Missing name of the actor');
  }

  // Kiểm tra xem có hình ảnh đại diện được tải lên không
  if (!profileImgFile) {
    return res.status(400).send('Missing profile image');
  }

  // Lấy tên file hình ảnh đại diện từ đối tượng file được tải lên
  const profileImg = profileImgFile.filename;

  const actorQuery = 'INSERT INTO actors (name, profile_img) VALUES (?, ?)';
  
  connection.query(actorQuery, [name, profileImg], (error, results) => {
    if (error) {
      console.error('Error adding actor:', error);
      return res.status(500).send('Error adding actor');
    }

    res.status(201).json({ actor_id: results.insertId, name, profile_img: profileImg });
  });
});


// API endpoint to delete an actor by ID
app.delete('/actors/:id', (req, res) => {
  const { id } = req.params;

  // Xóa diễn viên từ bảng actors
  const deleteActorQuery = 'DELETE FROM actors WHERE actor_id = ?';
  connection.query(deleteActorQuery, [id], (error, results) => {
    if (error) {
      console.error('Error deleting actor:', error);
      res.status(500).send('Error deleting actor');
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send('Actor not found');
      return;
    }

    res.status(200).send('Actor deleted successfully');
  });
});
// API endpoint to get actor details by ID
app.get('/actors/:id', (req, res) => {
  const { id } = req.params;
  const actorQuery = 'SELECT * FROM actors WHERE actor_id = ?';
  connection.query(actorQuery, [id], (error, results) => {
    if (error) {
      console.error('Error fetching actor details:', error);
      res.status(500).send('Error fetching actor details');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Actor not found');
      return;
    }
    res.json(results[0]);
  });
});
// API endpoint to update actor details
app.put('/actors/:id', upload1.fields([{ name: 'profile_img', maxCount: 1 }]), (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const profileImgFile = req.files['profile_img'] ? req.files['profile_img'][0] : null;
  
  // Kiểm tra xem có tên diễn viên được cung cấp không
  if (!name) {
    res.status(400).send('Missing name of the actor');
    return;
  }

  let profileImg = null;
  if (profileImgFile) {
    profileImg = profileImgFile.filename;
  }
  const actorUpdateQuery = 'UPDATE actors SET name = ?, profile_img = ? WHERE actor_id = ?';
  
  connection.query(actorUpdateQuery, [name, profileImg, id], (error, results) => {
    if (error) {
      console.error('Error updating actor details:', error);
      res.status(500).send('Error updating actor details');
      return;
    }
    res.status(200).send('Actor details updated successfully');
  });
});
// API endpoint to add an actor to a movie
app.post('/addActorToMovie', (req, res) => {
  const { movieId, actorId } = req.body;

  // Kiểm tra xem movieId và actorId có được cung cấp không
  if (!movieId || !actorId) {
    return res.status(400).send('Missing movieId or actorId');
  }

  // Kiểm tra xem diễn viên đã tồn tại trong bộ phim chưa
  const checkExistingQuery = 'SELECT * FROM movie_actors WHERE movie_id = ? AND actor_id = ?';
  connection.query(checkExistingQuery, [movieId, actorId], (checkError, checkResults) => {
    if (checkError) {
      console.error('Error checking existing actor:', checkError);
      return res.status(500).send('Error checking existing actor');
    }

    if (checkResults.length > 0) {
      return res.status(400).send('Actor already exists in the movie');
    }

    // Thêm diễn viên vào bộ phim
    const addActorQuery = 'INSERT INTO movie_actors (movie_id, actor_id) VALUES (?, ?)';
    connection.query(addActorQuery, [movieId, actorId], (addError, addResults) => {
      if (addError) {
        console.error('Error adding actor to movie:', addError);
        return res.status(500).send('Error adding actor to movie');
      }

      res.status(201).send('Actor added to movie successfully');
    });
  });
});
// Start the server

app.listen(8081, () => {
  console.log(`Server is listening on port`);
});
