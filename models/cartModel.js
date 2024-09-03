const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        ref: 'User'
    },

    totalQuantity: {
        type: Number,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },

    selectedProducts: {
        required: true,
        type: Array
    },

    createAt: {
        type: Date,
        index: {
            expires: 60 * 60 * 24 * 7
        }
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;