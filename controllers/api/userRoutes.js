const router = require('express').Router();
const { User } = require('../../models');

// Creates new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;

            res.status(200).json(newUser);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { name: req.body.username } });

        if (!userData) {
            res.status(400).json({ message: 'Name was not found, please try again.' });
            return;
        }

        const passwordCheck = await userData.checkPassword(req.body.password);

        if (!passwordCheck) {
            res.status(400).json({ message: 'Incorrect password was entered, please try again.' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Successfully logged in!' });
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// User logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;