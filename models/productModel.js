const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    imagePath: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    information: {
        type: {
            storage: {
                type: Number
            },
            numberOfSims: {
                type: String
            },
            cameraResolution: {
                type: Number
            },
            displaySize: {
                type: Number
            }
        },
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
