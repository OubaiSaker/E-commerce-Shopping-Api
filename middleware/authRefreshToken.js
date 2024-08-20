const jwt = require('jsonwebtoken');
const UserRefreshToken = require('../models/userRefreshTokenModel');

const authRefreshToken = async (req, res, next) => {
    try {
        if (!req.header("Authorization")) {
            return res.status(401).json({
                status: "failed",
                message: "access denied!"
            });
        }
        const refreshToken = req.header("Authorization").split(" ")[1];
        //check refresh token is valid 
        const validRefreshToken = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);
        //check  user refresh token if exist in database
        const userRefreshToken = await UserRefreshToken.findOne({
            refreshToken: refreshToken,
        });
        if (!userRefreshToken) {
            return res.status(403).json({
                status: "failed",
                message: "invalid refresh token please try login"
            })
        }
        req.user = validRefreshToken;
        next();
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                status: "failed",
                message: "refresh token has beeen expired please login to access your account "
            });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                status: "failed",
                message: "invalid refresh token "
            });
        }
        next(error);
    }
}

module.exports = authRefreshToken;