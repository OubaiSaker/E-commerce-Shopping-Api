const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/ordersController');
const authAccessToken = require('../middleware/authAccessToken');
const isAdmin = require('../middleware/isAdmin');

router.get('/admin',
    authAccessToken,
    isAdmin,
    ordersController.getAllOrders);

router.get('/',
    authAccessToken,
    ordersController.getUserOrders);

router.get('/:id',
    authAccessToken,
    ordersController.getSingleOrder);

router.put('/admin/:id',
    authAccessToken,
    isAdmin,
    ordersController.updateOrder);

router.delete('/admin/:id',
    authAccessToken,
    isAdmin,
    ordersController.deleteOrder);

module.exports = router;