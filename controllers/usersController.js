const bcrypt = require('bcryptjs')
const User = require('../models/userModel');
const UserRefreshToken = require('../models/userRefreshTokenModel');

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

module.exports.signIn = async (req, res, next) => {
    try {
        //check if user is exist
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "invalid email"
            });
        }
        //validation password
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) {
            return res.status(404).json({
                status: "failed",
                message: "invalid password"
            });
        }
        //generate access token 
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        //save refresh token in database
        const userRefreshToken = new UserRefreshToken({
            refreshToken: refreshToken,
            user_id: user._id
        })
        await userRefreshToken.save();
        //return response 
        return res.status(200)
            .header('x-access-token', accessToken)
            .header('x-refresh-token', refreshToken)
            .json({
                status: "success",
                message: "you logged in successfully"
            });
    }
    catch (error) {
        next(error);
    }
}