const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const UserRefreshToken = require('../models/userRefreshTokenModel');

module.exports.signUp = async (userName, email, password) => {
    //hash password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create new user 
    const newUser = new User({
        userName: userName,
        email: email,
        password: hashedPassword
    })
    //save user 
    await newUser.save();
    //return data
    const data = {
        userName: newUser.userName,
        email: newUser.email
    }
    return data;
}

module.exports.signIn = async (user) => {
    //generate tokens 
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    // save refresh token in database
    const userRefreshToken = new UserRefreshToken({
        refreshToken: refreshToken,
        user_id: user._id
    })
    await userRefreshToken.save();

    const data = {
        accessToken,
        refreshToken
    }

    return data;
}

module.exports.refreshToken = async (user_id) => {
    try {

        const user = await User.findById({ _id: user_id });
        const newAccessToken = user.generateAccessToken();
        return newAccessToken;
    }
    catch (error) {
        next(error);
    }
}