const express = require('express');
const router = express.Router();
const { getVideos, createVideo, getVideo, deleteVideo } = require('../controllers/videoController');
const { protect } = require('../middleware/auth');

router.get('/', getVideos);
router.post('/', protect, createVideo);
router.get('/:id', getVideo);
router.delete('/:id', protect, deleteVideo);

module.exports = router;