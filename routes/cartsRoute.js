const express = require('express');
const router = express.Router();

const cartsController = require('../controllers/cartsController');
const authAccessToken = require('../middleware/authAccessToken');

router.post('/addToCart/:id', authAccessToken, cartsController.addToCart);

module.exports = router;