const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/ordersController');
const authAccessToken = require('../middleware/authAccessToken');

router.post('/', authAccessToken, ordersController.submitUserOrder)

module.exports = router;
