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

module.exports.getAllOrders = async () => {
    try {
        const orders = await Order.find();

        return orders;
    }
    catch (error) {
        throw new Error(error);
    }
}

module.exports.getSingleOrder = async (order_id) => {
    try {
        const order = await Order.findById({ _id: order_id });
        if (order) return order;
        else return null;
    }
    catch (error) {
        throw new Error(error);
    }
}

module.exports.updateOrder = async (order_id, updatedData) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate({ _id: order_id },
            { $set: { ...updatedData } },
            { new: true });

        return updatedOrder;
    }
    catch (error) {
        throw new Error(error);
    }
}

module.exports.deleteOrder = async (order_id) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete({ _id: order_id });

        return deletedOrder;
    }
    catch (error) {
        throw new Error(error);
    }
}