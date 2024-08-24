const express = require('express');
const router = express.Router();

const productServices = require('../services/productsServices');

router.get('/index', async (req, res, next) => {
    try {
        const products = await productServices.getAllProducts();
        return res.status(200).json({
            status: "success",
            products: products
        });
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;