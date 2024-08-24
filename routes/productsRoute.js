const express = require('express');
const router = express.Router();

//import local Controllers
const productsController = require('../controllers/productsController');
const authAccessToken = require('../middleware/authAccessToken');

router.get('/', authAccessToken, productsController.getAllProducts)

module.exports = router;
