const express = require('express');
const router = express.Router();

const cartsController = require('../controllers/cartsController');
const ordersController = require('../controllers/ordersController');
const authAccessToken = require('../middleware/authAccessToken');

router.get('/', authAccessToken, cartsController.getCartInfoToCheckout);
router.post('/', authAccessToken, ordersController.submitUserOrder);

module.exports = router;
