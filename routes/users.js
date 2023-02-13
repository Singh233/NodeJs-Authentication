const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');


// route to create a new user
router.post('/create', usersController.create);

// route to create new session on sign in using passport as middleware
router.post('/create-session', passport.authenticate(
    'local',
    {failureMessage: '/'}
), usersController.createSession);


// route to sign out user
router.get('/sign-out', usersController.destroySession);


// passport google oAuth
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/',
    
}), usersController.createSession)


module.exports = router;