const express = require('express');
const router = express.Router();
const { getComments, addNewComment, updateCommentDetails, deleteCommentById, likeAComment, unlikeAComment } = require('../controllers/commentController');

router.get('/:movieId', getComments);
router.post('/addComment', addNewComment);
router.put('/updateComment/:id', updateCommentDetails);
router.delete('/:id', deleteCommentById);
router.post('/likeComment', likeAComment);
router.delete('/unlikeComment/:comment_id', unlikeAComment);

module.exports = router;