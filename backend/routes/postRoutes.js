const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticate = require('../middlewares/authenticate.js');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });


router.post('/CreatePost', authenticate, upload.single('media'), postController.createPost);

router.get('/GetPost', postController.getAllPosts);

router.get('/user/:userId', postController.getUserPosts);
router.delete('/:postId', authenticate, postController.deletePost);

module.exports = router;
