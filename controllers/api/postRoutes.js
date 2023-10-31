const router = require('express').Router();
const { Post, Comment } = require('../../models');

// Create new post
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            name: req.body.name,
            text: req.body.text,
            user_id: req.session.user_id
        });

        res.status(200).json(newPost);

    } catch (err) {
        res.status(500).json(err)
    }
});

// Edit post
router.put('/:id', async (req, res) => {
    try {
        const editPost = await Post.update(
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id
                }
            },
            {
                name: req.body.name,
                text: req.body.text
            }
        );

        res.status(200).json(editPost);

    } catch (err) {
        res.status(500).json(err)
    }
});

// Add Comment
router.post('/comment/:id', async (req, res) => {
    try {
        const comment = await Comment.create(
            {
                text: req.body.text,
                user_id: req.session.user_id,
                post_id: req.params.id
            }
        );

        res.status(200).json(comment);
        
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;