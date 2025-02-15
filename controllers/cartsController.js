const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');

const cartsServices = require('../services/cartsServices');

module.exports.getUserCart = async (req, res, next) => {
    try {
        const userCart = req.user.cart;

        if (!userCart) {
            return res.status(404).json({
                status: "failed",
                message: "your cart is empty"
            });
        }
        else {
            return res.status(200).json({
                status: "success",
                userCart: userCart
            });
        }
    }
    catch (error) {
        next(error);
    }
}

module.exports.addToCart = async (req, res, next) => {
    try {
        const user_id = req.user.user_id;
        const cart = req.user.cart;
        const product_id = req.params.id;

        if (!cart) {
            const totalQuantity = await cartsServices.createNewCart(user_id, product_id);
            return res.status(201).json({
                status: "success",
                message: "create your cart successfully",
                totalQuantity: totalQuantity
            });
        }
        else {
            const totalQuantity = await cartsServices.addToCart(user_id, product_id, cart);
            //return response 
            return res.status(201).json({
                status: "success",
                message: "update your cart successfully",
                totalQuantity: totalQuantity
            });
        }
    }
    catch (error) {
        next(error);
    }
}

module.exports.increaseItem = async (req, res, next) => {
    try {
        const indexOfProduct = req.params.index;
        const cart = req.user.cart;

        if (!cart) {
            return res.status(404).json({
                status: "failed",
                message: "your cart has been expired"
            });
        }
        else {
            const updatedCart = await cartsServices.increaseItem(indexOfProduct, cart);

            return res.status(200).json({
                status: "success",
                message: "your cart has been updated successfully",
                updatedCart: updatedCart
            });
        }
    }
    catch (error) {
        next(error);
    }
}

module.exports.decreaseItem = async (req, res, next) => {
    try {
        const indexOfProduct = req.params.index;
        const cart = req.user.cart;

        if (!cart) {
            return res.status(404).json({
                status: "failed",
                message: "your cart has been expired"
            });
        }
        else {
            const updatedCart = await cartsServices.decreaseItem(indexOfProduct, cart);

            return res.status(200).json({
                status: "success",
                message: "your cart has been updated successfully",
                updatedCart: updatedCart
            });
        }
    }
    catch (error) {
        next(error);
    }
}

module.exports.deleteItem = async (req, res, next) => {
    try {
        const indexOfProduct = req.params.index;
        const cart = req.user.cart;

        if (!cart) {
            return res.status(404).json({
                status: "failed",
                message: "your cart has been expired"
            });
        }
        else {
            const updatedCart = await cartsServices.deleteItem(indexOfProduct, cart);
            if (updatedCart) {
                return res.status(200).json({
                    status: "success",
                    message: "your cart has been updated successfully",
                    updatedCart: updatedCart
                });
            }
            else {
                return res.status(200).json({
                    status: "success",
                    message: "your cart is empty",
                });
            }
        }
    }
    catch (error) {
        next(error);
    }
}

module.exports.getCartInfoToCheckout = async (req, res, next) => {
    try {
        const userCart = req.user.cart;

        if (!userCart) {
            return res.status(404).json({
                status: "failed",
                message: "your cart has been expired"
            });
        }
        else {
            const totalPrice = userCart.totalPrice;
            const totalQuantity = userCart.totalQuantity;
            const user_id = req.user.user_id;
            const user = await User.findById({ _id: user_id })
                .select('-password');

            return res.status(200).json({
                status: "success",
                totalPrice: totalPrice,
                totalQuantity: totalQuantity,
                user: user
            });
        }
    }
    catch (error) {
        next(error);
    }
}