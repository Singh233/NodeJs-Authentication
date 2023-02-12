const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
const signInController = require('../controllers/users_controller');
const signUpController = require('../controllers/users_controller');

router.get('/sign-up', signUpController.signUp);
router.get('/sign-in', signInController.signIn);

// route to create a new user
router.post('/create', usersController.create);

// route to create new session on sign in using passport as middleware
router.post('/create-session', passport.authenticate(
    'local',
    {failureMessage: '/'}
), usersController.createSession);


module.exports = router;