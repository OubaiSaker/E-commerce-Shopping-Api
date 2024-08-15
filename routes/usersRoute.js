const express = require('express');
const router = express.Router();
//import local modules
const { signUpValidator, signInValidator } = require('../middleware/validator');
const validate = require('../middleware/validationResult');
const usersController = require('../controllers/usersController');

router.post('/signup', [signUpValidator, validate], usersController.signUp);
router.post('/signin', [signInValidator, validate], usersController.signIn);

module.exports = router;