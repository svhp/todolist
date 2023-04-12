const express = require('express');
const path = require('path');
const router = express.Router();
const { signup, signin, loginpage } = require('../controllers/auth');

router.route('/').get((req, res) => {
    res.redirect('/login');
});
router.route('/signup').post(signup);
router.route('/login').get(loginpage).post(signin);
router.route('/index').get((req, res) => {
    const options = {
        root: path.join(path.dirname(__dirname), 'public')
    };
    res.sendFile('index.html', options);
});
router.route('/signup').get((req, res) => {
    const options = {
        root: path.join(path.dirname(__dirname), 'public')
    };
    res.sendFile('signup.html', options);
});

module.exports = router;
