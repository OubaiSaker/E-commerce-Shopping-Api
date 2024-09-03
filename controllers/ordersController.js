const ordersServices = require('../services/ordersServices');

module.exports.submitUserOrder = async (req, res, next) => {
    try {
        const user_id = req.user.user_id;
        const user_cart = req.user.cart;
        const address = req.body.address;
        const mobile = req.body.mobile;
        const name = req.user.userName;
        const paymentId = req.body.paymentId;
        const orderPrice = req.user.cart.totalPrice;

        const user_order = await ordersServices.submitUserOrder(user_id, user_cart, address, mobile, name, paymentId, orderPrice);

        return res.status(200).json({
            status: "success",
            message: "your order has been add successfully",
            order: user_order
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports.getUserOrders = async (req, res, next) => {
    try {
        const user_id = req.user.user_id;

        const userOrders = await ordersServices.getUserOrders(user_id);

        return res.status(200).json({
            status: "success",
            message: "get all your orders",
            userOrders: userOrders
        });
    }
    catch (error) {
        next(error);
    }
}