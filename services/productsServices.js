const Product = require('../models/productModel');

module.exports.getAllProducts = async (page, pageSize) => {
    try {
        const products = await Product.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        return products;
    }
    catch (error) {
        throw new Error(error);
    }
}