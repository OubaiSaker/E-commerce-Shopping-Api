const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const cartsServices = require('../services/cartsServices');

module.exports.addToCart = async (req, res, next) => {
    try {
        const user_id = req.user.user_id;
        const cart = req.user.cart;
        const product_id = req.params.id;

        if (!cart) {
            const newCart = await cartsServices.createNewCart(user_id, product_id);
            return res.status(201).json({
                status: "success",
                message: "create your cart successfully",
                user_cart: newCart
            });
        }
        else {
            const updatedCart = await cartsServices.addToCart(user_id, product_id, cart);
            //return response 
            return res.status(201).json({
                status: "success",
                message: "update your cart successfully",
                user_cart: updatedCart
            });
        }
    }
    catch (error) {
        next(error);
    }
}