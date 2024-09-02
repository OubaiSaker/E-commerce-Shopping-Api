const Order = require('../models/orderModel');
const Cart = require('../models/cartModel')

module.exports.submitOrder = async (user_id, user_cart, address, name, paymentId, orderPrice) => {
    try {
        const order = new Order({
            user: user_id,
            cart: user_cart,
            address: address,
            name,
            paymentId,
            orderPrice
        });
        await order.save();

        await Cart.findByIdAndDelete({ _id: user_id });

        return order;
    }
    catch (error) {
        throw new Error(error);
    }
}