const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    content: String,
    media: String,
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Posts', postSchema);


router.post('/create-post', async (req, res) => {
    const { userId, content, media } = req.body;

    try {
        const post = new Post({
            userId,
            content,
            media
        });

        await post.save();
        res.status(200).send({ message: 'Post created successfully' });
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
});

router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'Name Username'); // Populate user details
        res.status(200).send(posts);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
});

module.exports = router;
