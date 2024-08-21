const Product = require('../models/productModel');
const productsServices = require('../services/productsServices');

module.exports.getAllProducts = async (req, res, next) => {
    try {
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
            products: products
        });
    }
    catch (error) {
        next(error);
    }
}