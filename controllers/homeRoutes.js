const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const authCheck = require('../utils/auth');

// Displaying login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Displaying sign up page
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

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

        res.render('homepage', { posts, logged_in: req.session.logged_in });
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

// Display Edit Post
router.get('/edit/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            where: { user_id: req.session.user_id },
            include: [{ model: User }]
        });

        if (!postData) {
            res.status(404).json({ message: 'Could not find post data to edit' })
        };

        const post = postData.get({ plain: true });

        res.render('edit', { post });
        
    } catch (err) {
        res.status(500).json(err)
    }
});

// Display Comment Page
router.get('/comment/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }]
        });

        if (!postData) {
            res.status(404).json({ message: 'Could not find post data to comment' })
        };

        const post = postData.get({ plain: true });

        res.render('comment', { post });
        
    } catch (err) {
        res.status(500).json(err)
    }
});

// Display Create New Post
router.get('/create', async (req, res) => {
    res.render('create');
});

module.exports = router;