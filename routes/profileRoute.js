const express = require('express');
const router = express.Router();

const authAccessToken = require('../middleware/authAccessToken');
const ordersController = require('../controllers/ordersController');

router.get('/orders', authAccessToken, ordersController.getUserOrders)

module.exports = router;