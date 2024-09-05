const express = require('express');
const router = express.Router();

const productServices = require('../services/productsServices');
const authAccessToken = require('../middleware/authAccessToken');

router.get('/index', async (req, res, next) => {
    try {
        let totalQuantity = 0;

        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 3;
        if (page < 1 || pageSize < 1) {
            return res.status(400).json({
                status: "failed",
                message: 'Invalid page or pageSize value'
            });
        }

        const products = await productServices.getAllProducts(page, pageSize);

        return res.status(200).json({
            status: "success",
            totalQuantity: totalQuantity,
            products: products
        });
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;