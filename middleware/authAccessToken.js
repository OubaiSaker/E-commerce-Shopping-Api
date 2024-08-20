const jwt = require('jsonwebtoken');

const authAccessToken = async (req, res, next) => {
    try {
        if (!req.header("Authorization")) {
            return res.status(401).json({
                status: "failed",
                message: "access denied!"
            });
        }
        const accessToken = req.header("Authorization").split(" ")[1];
        //verify access token 
        const validAccessToken = jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN);
        //send user info in request
        req.user = validAccessToken;
        next();
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                status: "failed",
                message: "access token has beeen expired please refresh your token "
            });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                status: "failed",
                message: "invalid access token "
            });
        }
        next(error)
    }
}

module.exports = authAccessToken;