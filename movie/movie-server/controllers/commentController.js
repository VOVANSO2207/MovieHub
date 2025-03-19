const { getCommentsByMovieId, addComment, updateComment, deleteComment, likeComment, unlikeComment, getLikesCount } = require('../models/commentModel');
const { getUsernameById } = require('../models/userModel');

const getComments = async (req, res) => {
  try {
    const { movieId } = req.params;
    const comments = await getCommentsByMovieId(movieId);
    res.json(comments);
  } catch (error) {
    res.status(500).send('Error fetching comments');
  }
};

const addNewComment = async (req, res) => {
  try {
    const { user_id, movie_id, parent_comment_id, content } = req.body;
    const created_at = new Date();
    const updated_at = new Date();
    const result = await addComment([user_id, movie_id, parent_comment_id, content, created_at, updated_at]);
    const username = await getUsernameById(user_id);
    res.status(200).json({ message: 'Comment added successfully', results: result, username });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};

const updateCommentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, movie_id, parent_comment_id, content } = req.body;
    const updated_at = new Date();
    await updateComment(id, [user_id, movie_id, parent_comment_id, content, updated_at]);
    res.status(200).json({ message: 'Comment updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment', error });
  }
};

const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteComment(id);
    res.status(200).send('Comment deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting comment');
  }
};

const likeAComment = async (req, res) => {
  try {
    const { user_id, comment_id } = req.body;
    await likeComment(user_id, comment_id);
    const likes_count = await getLikesCount(comment_id);
    res.status(200).json({ message: 'Like added successfully', likes_count });
  } catch (error) {
    res.status(500).json({ message: 'Error liking comment', error });
  }
};

const unlikeAComment = async (req, res) => {
  try {
    const { user_id } = req.body;
    const { comment_id } = req.params;
    await unlikeComment(user_id, comment_id);
    const likes_count = await getLikesCount(comment_id);
    res.status(200).json({ message: 'Like removed successfully', likes_count });
  } catch (error) {
    res.status(500).json({ message: 'Error unliking comment', error });
  }
};

module.exports = { getComments, addNewComment, updateCommentDetails, deleteCommentById, likeAComment, unlikeAComment };