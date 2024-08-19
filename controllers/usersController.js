const bcrypt = require('bcryptjs')
const User = require('../models/userModel');
const UserRefreshToken = require('../models/userRefreshTokenModel');
const userServices = require('../services/userServices');
const verifyAccount = require('../helpers/emailVerification');

module.exports.signUp = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;
        //check email if exist in database
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(401).json({
                status: "failed",
                message: "user by given email already exist"
            });
        }
        //sign up service 
        const response = await userServices.signUp(userName, email, password);
        //send verify email
        await verifyAccount(email);
        //return response
        res.status(201).json({
            status: "success",
            message: "your Account has been created successfully",
            user: response.data
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports.signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //check if user is exist
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "invalid email,please enter a valid email and try again"
            });
        }
        //validation password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(404).json({
                status: "failed",
                message: "invalid password, please check your password!"
            });
        }

        //sign in service
        const response = await userServices.signIn(user);
        const refreshToken = response.refreshToken;
        const accessToken = response.accessToken
        //return response 
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return res.status(200)
            .header('x-access-token', accessToken)
            .json({
                status: "success",
                message: "you logged in successfully"
            });
    }
    catch (error) {
        next(error);
    }
}

module.exports.refreshToken = async (req, res, next) => {
    try {

        const user_id = req.user.user_id;
        const newAccessToken = await userServices.refreshToken(user_id);

        res.status(200)
            .header('x-access-token', newAccessToken)
            .json({
                status: "success",
                message: "refresh your token successfully"
            });
    }
    catch (error) {
        next(error);
    }
}

module.exports.logout = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (!cookies.refreshToken) return res.sendStatus(204);

        await UserRefreshToken.deleteOne({
            refreshToken: cookies.refreshToken
        });

        res.clearCookie("refreshToken", { httpOnly: true });
        return res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
}