const bcrypt = require('bcryptjs')
const User = require('../models/userModel');
const UserRefreshToken = require('../models/userRefreshTokenModel');
const userServices = require('../services/userServices');
const ordersServices = require('../services/ordersServices')
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
            user: response
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
                message: "invalid email! please enter a valid email and try again"
            });
        }
        //validation password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(404).json({
                status: "failed",
                message: "invalid password, please enter a valid password!"
            });
        }
        //sign in service
        const response = await userServices.signIn(user);
        const refreshToken = response.refreshToken;
        const accessToken = response.accessToken
        //return response 
        return res.status(200)
            .json({
                status: "success",
                message: "you logged in successfully",
                accessToken: accessToken,
                refreshToken: refreshToken
            });
    }
    catch (error) {
        next(error);
    }
}

module.exports.getCurrentUser = async (req, res, next) => {
    try {
        const user_id = req.user.user_id;
        const user = await User.findById({ _id: user_id })
            .select('-password ');

        const userOrders = await ordersServices.getUserOrders(user_id);

        return res.status(200).json({
            status: "success",
            message: "get current user",
            currentUser: user,
            userOrders: userOrders
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const updatedData = req.body;
        const user_id = req.user.user_id;

        const user = await User.findById({ _id: user_id });
        //check if user updated his email
        if (updatedData.email === user.email) {
            const updatedUser = await userServices.updateUser(user_id, updatedData);
            //return response 
            return res.status(200).json({
                status: "success",
                message: "user has been updated successfully",
                updatedUser: updatedUser
            });
        }
        else {
            const user = await User.findOne({ email: updatedData.email });
            if (user) {
                return res.status(401).json({
                    status: "failed",
                    message: "this email already registered"
                });
            }
            else {
                const updatedUser = await userServices.updateUser(user_id, updatedData);
                //return response 
                return res.status(200).json({
                    status: "success",
                    message: "user has been updated successfully",
                    updatedUser: updatedUser
                });
            }
        }
    }
    catch (error) {
        next(error);
    }
}

module.exports.updatePassword = async (req, res, next) => {
    try {
        const user_id = req.user.user_id;
        const { oldPassword, newPassword } = req.body;
        //check if old password is correct 
        const user = await User.findById({ _id: user_id });
        const isValidPassword = await bcrypt.compare(oldPassword, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                status: "failed",
                message: "your old password not correct! please enter a valid password"
            });
        }
        //update password service
        await userServices.updatePassword(user_id, newPassword);
        //return response 
        return res.status(200).json({
            status: "success",
            message: "user password has been updated successfully"
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

        return res.status(200)
            .json({
                status: "success",
                message: "refresh your token successfully",
                accessToken: newAccessToken
            });
    }
    catch (error) {
        next(error);
    }
}

module.exports.logout = async (req, res, next) => {
    try {
        await UserRefreshToken.deleteMany({
            user_id: req.user.user_id
        });

        return res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
}

module.exports.deleteUser = async (req, res, next) => {
    try {
        const user_id = req.user.user_id;

        const isDeleted = await userServices.deleteUser(user_id);
        if (isDeleted) {
            return res.status(200).json({
                status: "success",
                message: "user has been deleted successfully"
            });
        }
        else {
            return res.status(422).json({
                status: "failed",
                message: "some thing went wrong !please try again"
            });
        }
    }
    catch (error) {
        next(error);
    }
}