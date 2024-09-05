const express = require('express');
const router = express.Router();

//import local Controllers
const productsController = require('../controllers/productsController');
const authAccessToken = require('../middleware/authAccessToken');
const upload = require('../helpers/uploadProductImage');

router.get('/',
    authAccessToken,
    productsController.getAllProducts);
router.get('/:id',
    authAccessToken,
    productsController.getSingleProduct);
router.post('/addProduct',
    authAccessToken,
    upload.single('productImage'),
    productsController.addProduct);
router.put('/updateProduct/:id',
    authAccessToken,
    upload.single('productImage'),
    productsController.updateProduct);
router.delete('/deleteProduct/:id', authAccessToken, productsController.deleteProduct);

module.exports = router;
