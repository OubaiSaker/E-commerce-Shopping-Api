const mongoose = require('mongoose');

const userRefreshTokenSchema = new mongoose.Schema({
    refreshToken: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        index: { expires: '1m' }
    }
});

const UserRefreshToken = mongoose.model('UserRefreshToken', userRefreshTokenSchema);

module.exports = UserRefreshToken;