//import remote module
const express = require('express');
const router = express.Router();
//import local modules
const authRefreshToken = require('../middleware/authRefreshToken');
const authAccessToken = require('../middleware/authAccessToken');
const { signUpValidator, signInValidator, updateUserValidator, updatePasswordValidator } = require('../middleware/validator');
const validationRes = require('../middleware/validationResult');
const usersController = require('../controllers/usersController');
const upload = require('../helpers/uploadAvater');

router.post('/signup',
    [signUpValidator, validationRes],
    usersController.signUp);
router.post('/signin',
    [signInValidator, validationRes],
    usersController.signIn);
router.get('/profile',
    authAccessToken,
    usersController.getCurrentUser);
router.post('/profile/uploadAvater',
    authAccessToken,
    upload.single('myAvater'),
    usersController.uploadAvater);
router.put('/update',
    authAccessToken,
    [updateUserValidator, validationRes],
    usersController.updateUser);
router.put('/update-password',
    authAccessToken,
    [updatePasswordValidator, validationRes],
    usersController.updatePassword);
router.get('/refresh',
    authRefreshToken,
    usersController.refreshToken);
router.post('/logout',
    authAccessToken,
    usersController.logout);
router.delete('/delete',
    authAccessToken,
    usersController.deleteUser)

module.exports = router;