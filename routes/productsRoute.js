const express = require('express');
const router = express.Router();

//import local Controllers
const productsController = require('../controllers/productsController')

router.get('/', productsController.getAllProducts)

module.exports = router;
