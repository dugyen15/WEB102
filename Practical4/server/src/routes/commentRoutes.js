const express = require('express');
const router = express.Router();
const { getComments, addComment, deleteComment } = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

router.get('/:videoId/comments', getComments);
router.post('/:videoId/comments', protect, addComment);
router.delete('/comments/:id', protect, deleteComment);

module.exports = router;