const User = require('../models/userModel');

module.exports.signUp = async (req, res, next) => {
    try {
        res.status(200).json({
            status: "success",
            message: "sing up successfully"
        });
    }
    catch (error) {
        next(error);
    }
}