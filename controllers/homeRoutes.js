const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const authCheck = require('../utils/auth');

// Display Homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }]
        });

        if (!postData) {
            res.status(404).json({ message: 'Could not find post data' })
        };

        const posts = postData.map((item) => item.get({ plain: true }));

        res.render('homepage', { posts });
        // res.json(posts);
    } catch (err) {
        res.status(500).json(err)
    }
});

// Display Dashboard
router.get('/dashboard', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id }
        });

        if (!postData) {
            res.status(404).json({ message: 'Could not find post data' })
        };

        const posts = postData.map((item) => item.get({ plain: true }));

        res.render('dashboard', { posts });
        
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;