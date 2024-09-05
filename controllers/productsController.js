const productsServices = require('../services/productsServices');
const Product = require('../models/productModel');
const fs = require('fs');

module.exports.getAllProducts = async (req, res, next) => {
    try {
        let totalQuantity = 0;
        const cart = req.user.cart;
        if (cart) {
            totalQuantity = cart.totalQuantity;
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
}

module.exports.getSingleProduct = async (req, res, next) => {
    try {
        const product_id = req.params.id;

        const product = await productsServices.getSingleProduct(product_id);

        return res.status(200).json({
            status: "success",
            product: product
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports.addProduct = async (req, res, next) => {
    try {
        const productName = req.body.productName;
        const information = JSON.parse(req.body.information);
        const price = req.body.price;

        let imagePath = req.file.path.split('\\')[2];
        imagePath = '/images/' + imagePath;

        const newProduct = await productsServices.addProduct(imagePath, productName, information, price);

        return res.status(201).json({
            status: "success",
            message: "new product has been add successfully",
            newProduct: newProduct
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports.updateProduct = async (req, res, next) => {
    try {
        const product_id = req.params.id;
        const { productName, price } = req.body;
        // Parse the information field if it's present
        const information = req.body.information ? JSON.parse(req.body.information) : undefined;
        // Find the product by ID
        let product = await Product.findById(product_id);
        if (!product) {
            return res.status(404).json({
                status: "fail",
                message: "Product not found"
            });
        }
        // Update fields if they are provided
        if (productName) product.productName = productName;
        if (information) product.information = information;
        if (price) product.price = price;
        // Update the product image if a new one is uploaded
        if (req.file) {
            let newImagePath = req.file.path.split('\\')[2];
            newImagePath = '/images/' + newImagePath;

            const oldPath = 'public' + product.imagePath;
            fs.unlink(oldPath, async (err) => {
                if (err) {
                    throw new Error(err);
                }
                product.imagePath = newImagePath;
            })

        }
        // Save the updated product
        await product.save();

        return res.status(200).json({
            status: "success",
            message: "Product updated successfully",
            updatedProduct: product
        });

    } catch (error) {
        next(error);
    }
}

module.exports.deleteProduct = async (req, res, next) => {
    try {
        const product_id = req.params.id;
        const response = await productsServices.deleteProduct(product_id);
        if (response) {
            return res.status(200).json({
                status: "success",
                message: "product has been deleted successfully"
            })
        }

        return res.status(200).json({
            status: "failed",
            message: "can`t delete product"
        })

    }
    catch (error) {
        next(error);
    }
}
