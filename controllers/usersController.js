const bcrypt = require('bcryptjs')
const User = require('../models/userModel');

module.exports.signUp = async (req, res, next) => {
    try {
        //check email if exist in database
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            res.status(401).json({
                status: "failed",
                message: "user by given email already exist"
            });
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //create new user 
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword
        })
        //save user 
        await newUser.save();
        const { password, ...data } = newUser._doc
        //return response 
        res.status(201).json({
            status: "success",
            message: "sing up successfully",
            user: data
        });
    }
    catch (error) {
        next(error);
    }
}