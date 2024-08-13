const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.post('/signup', usersController.signUp);

module.exports = router;