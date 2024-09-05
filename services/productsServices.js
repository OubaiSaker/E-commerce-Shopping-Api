const Product = require('../models/productModel');
const fs = require('fs');

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

module.exports.getSingleProduct = async (product_id) => {
    try {
        const product = await Product.findById({ _id: product_id });

        return product;
    }
    catch (error) {
        throw new Error(error);
    }
}

module.exports.addProduct = async (imagePath, productName, information, price) => {
    try {
        const newProduct = new Product({
            imagePath: imagePath,
            productName: productName,
            information: information,
            price: price
        });
        await newProduct.save();

        return newProduct;
    }
    catch (error) {
        throw new Error(error);
    }
}

module.exports.updateProduct = async (product_id, imagePath, data) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate({ _id: product_id },
            {
                $set: {
                    imagePath: imagePath,
                    ...data
                }
            },
            { new: true });

        return updatedProduct;
    }
    catch (error) {
        throw new Error(error);
    }
}

module.exports.deleteProduct = async (product_id) => {
    try {
        const product = await Product.findByIdAndDelete({ _id: product_id });
        const imagePath = 'public' + product.imagePath;
        fs.unlink(imagePath, (err) => {
            if (err) throw new Error(err);
            console.log('path/file.txt was deleted');
        });
        if (product) {
            return true
        }
        else return false;
    }
    catch (error) {
        throw new Error(error);
    }
}