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

module.exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await ordersServices.getAllOrders();

        return res.status(200).json({
            status: "success",
            message: "all orders in database",
            orders: orders
        })
    }
    catch (error) {
        next(error);
    }
}

module.exports.getSingleOrder = async (req, res, next) => {
    try {
        const order_id = req.params.id;
        const order = await ordersServices.getSingleOrder(order_id);
        if (order) {
            return res.status(200).json({
                status: "success",
                order: order
            });
        }
        else {
            return res.status(200).json({
                status: "success",
                message: "order not found"
            });
        }
    }
    catch (error) {
        next(error);
    }
}

module.exports.updateOrder = async (req, res, next) => {
    try {
        const order_id = req.params.id;
        const updatedData = req.body;

        const updatedOrder = await ordersServices.updateOrder(order_id, updatedData);

        return res.status(200).json({
            status: "success",
            updatedOrder: updatedOrder
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports.deleteOrder = async (req, res, next) => {
    try {
        const order_id = req.params.id;

        const isDeleted = await ordersServices.deleteOrder(order_id);

        if (isDeleted) {
            return res.status(200).json({
                status: "success",
                message: "order Has been deleted successfully"
            });
        }
        else {
            return res.status(200).json({
                status: "failed",
                message: "order not found"
            });
        }

    }
    catch (error) {
        next(error);
    }
}