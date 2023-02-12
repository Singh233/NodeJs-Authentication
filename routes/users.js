const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');
const signInController = require('../controllers/users_controller');
const signUpController = require('../controllers/users_controller');

router.get('/sign-up', signUpController.signUp);
router.get('/sign-in', signInController.signIn);
router.post('/create', usersController.create);


module.exports = router;