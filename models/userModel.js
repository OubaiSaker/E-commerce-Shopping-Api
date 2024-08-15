const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "member"
    }
});

userSchema.methods.generateAccessToken = function () {
    const payload = {
        userName: this.userName,
        email: this.email,
        role: this.role
    }

    const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '1m' });
    return accessToken;
}

userSchema.methods.generateRefreshToken = function () {
    const payload = {
        userName: this.userName,
        email: this.email,
        role: this.role
    }

    const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, { expiresIn: '1d' });

    return refreshToken;
}

const User = mongoose.model('User', userSchema);

module.exports = User;