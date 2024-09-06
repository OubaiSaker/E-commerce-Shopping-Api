const express = require('express');
const router = express.Router();

//import local Controllers
const productsController = require('../controllers/productsController');
const authAccessToken = require('../middleware/authAccessToken');
const upload = require('../helpers/uploadProductImage');
const isAdmin = require('../middleware/isAdmin');

router.get('/',
    authAccessToken,
    productsController.getAllProducts);
router.get('/:id',
    authAccessToken,
    productsController.getSingleProduct);
router.post('/addProduct',
    authAccessToken,
    isAdmin,
    upload.single('productImage'),
    productsController.addProduct);
router.put('/updateProduct/:id',
    authAccessToken,
    isAdmin,
    upload.single('productImage'),
    productsController.updateProduct);
router.delete('/deleteProduct/:id',
    authAccessToken,
    isAdmin,
    productsController.deleteProduct);

module.exports = router;
