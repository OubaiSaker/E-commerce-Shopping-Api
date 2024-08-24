const Cart = require('../models/cartModel');
const jwt = require('jsonwebtoken');

const authAccessToken = async (req, res, next) => {
    try {
        if (!req.header("Authorization")) {
            return res.status(401).json({
                status: "failed",
                message: "access denied!"
            });
        }
        const accessToken = req.header("Authorization").split(" ")[1];
        //verify access token 
        const validAccessToken = jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN);
        //find user cart in database
        const user_id = validAccessToken.user_id;
        const cart = await Cart.findById({ _id: user_id });
        //send user info in request
        req.user = validAccessToken;
        req.user.cart = cart;
        next();
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                status: "failed",
                message: "access token has beeen expired please refresh your token "
            });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                status: "failed",
                message: "invalid access token "
            });
        }
        next(error)
    }
}

module.exports = authAccessToken;