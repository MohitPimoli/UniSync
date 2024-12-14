const Post = require('../models/post');
const User = require('../models/user');
const { createNotification } = require('../controllers/notificationController');

exports.createPost = async (req, res) => {
    const { content } = req.body;
    const userId = req.user.userId;


    try {
        let mediaUrl = null;
        if (req.file) {
            mediaUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        const post = new Post({
            userId,
            content,
            media: mediaUrl
        });

        await post.save();
        res.status(200).send({ message: 'Post created successfully', post });
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'Name Username');
        res.status(200).send(posts);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
};

exports.getUserPosts = async (req, res) => {
    const { userId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ message: 'Invalid user ID' });
        }

        const posts = await Post.find({ userId }).populate('userId', 'Name Username');

        if (!posts.length) {
            return res.status(404).send({ message: 'No posts found for this user' });
        }

        res.status(200).send(posts);
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
};

exports.deletePost = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        if (post.userId.toString() !== req.user.userId) {
            return res.status(403).send({ message: 'You can only delete your own posts' });
        }

        await post.remove();
        res.status(200).send({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
};


// Example function to handle liking a post
exports.likePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.userId;

    try {
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Assume a "likes" field in Post schema
        if (!post.likes.includes(userId)) {
            post.likes.push(userId);
            await post.save();

            // Create notification
            await createNotification(
                post.userId,
                'post_like',
                `${req.user.name} liked your post`,
                userId,
                postId
            );
        }

        res.status(200).json({ message: 'Post liked successfully' });
    } catch (err) {
        console.error('Error liking post:', err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

