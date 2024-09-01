const express = require('express');
const router = express.Router();

const productServices = require('../services/productsServices');
const authAccessToken = require('../middleware/authAccessToken');

router.get('/index', authAccessToken, async (req, res, next) => {
    try {
        let totalQuantity = 0;
        const cart = req.user.cart;
        if (cart) {
            totalQuantity = cart.totalQuantity;
        }

        const products = await productServices.getAllProducts();

        return res.status(200).json({
            status: "success",
            products: products,
            totalQuantity: totalQuantity
        });
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;