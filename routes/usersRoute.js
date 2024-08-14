const express = require('express');
const router = express.Router();
//import local modules
const { signUpValidator } = require('../middleware/validator');
const validate = require('../middleware/validationResult');
const usersController = require('../controllers/usersController');

router.post('/signup', [signUpValidator, validate], usersController.signUp);

module.exports = router;