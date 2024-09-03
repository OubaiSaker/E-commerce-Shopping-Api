const Order = require('../models/orderModel');
const Cart = require('../models/cartModel')

module.exports.submitUserOrder = async (user_id, user_cart, address, mobile, name, paymentId, orderPrice) => {
    try {
        const order = new Order({
            user: user_id,
            cart: user_cart,
            address,
            mobile,
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

module.exports.getUserOrders = async (user_id) => {
    try {
        const userOrders = await Order.find({ user: user_id })
        return userOrders;
    }
    catch (error) {
        throw new Error(error);
    }
}