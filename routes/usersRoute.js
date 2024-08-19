const express = require('express');
const router = express.Router();
const authRefreshToken = require('../middleware/authRefreshToken');
//import local modules
const { signUpValidator, signInValidator } = require('../middleware/validator');
const validationRes = require('../middleware/validationResult');
const usersController = require('../controllers/usersController');

router.post('/signup', [signUpValidator, validationRes], usersController.signUp);
router.post('/signin', [signInValidator, validationRes], usersController.signIn);
router.get('/refresh', authRefreshToken, usersController.refreshToken);
router.post('/logout', usersController.logout)


module.exports = router;