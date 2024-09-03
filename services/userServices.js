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

module.exports.updateUser = async (user_id, updatedData) => {
    try {
        //updated user information
        const newUser = {
            userName: updatedData.userName,
            email: updatedData.email,
            mobile: updatedData.mobile,
            address: updatedData.address
        };
        //update user in data base
        const updatedUser = await User.findByIdAndUpdate({ _id: user_id },
            {
                $set: newUser
            },
            { new: true }).select('-password -role');
        //return data
        return updatedUser;
    }
    catch (error) {
        throw new Error(error);
    }

}

module.exports.updatePassword = async (user_id, newPassword) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await User.updateOne({ _id: user_id },
            { $set: { password: hashedPassword } }
        );
    }
    catch (error) {
        throw new Error(error);
    }
}

module.exports.refreshToken = async (user_id) => {
    try {
        const user = await User.findById({ _id: user_id });
        const newAccessToken = user.generateAccessToken();
        return newAccessToken;
    }
    catch (error) {
        throw new Error(error);
    }
}

module.exports.deleteUser = async (user_id) => {
    try {
        await UserRefreshToken.deleteMany({ user_id: user_id });
        const deletedUser = await User.findByIdAndDelete({ _id: user_id });

        if (deletedUser) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw new Error(error);
    }
}