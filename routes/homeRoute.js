const express = require('express');
const router = express.Router();

const authAccessToken = require('../middleware/authAccessToken');
const productsServices = require('../services/productsServices');

router.get('/', authAccessToken, async (req, res, next) => {
    try {
        let totalQuantity = 0;
        if (req.user.cart) {
            totalQuantity = req.user.cart.totalQuantity;
        }
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 3;
        if (page < 1 || pageSize < 1) {
            return res.status(400).json({
                status: "failed",
                message: 'Invalid page or pageSize value'
            });
        }

        const products = await productsServices.getAllProducts(page, pageSize);

        return res.status(200).json({
            status: "success",
            totalQuantity: totalQuantity,
            products: products
        });
    }
    catch (error) {
        next(error);
    }
})


module.exports = router;