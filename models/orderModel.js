const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({

    user: {
        type: schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    cart: {
        type: Object,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    paymentId: {
        type: String,
        required: true
    },

    orderPrice: {
        type: Number,
        required: true
    }

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;