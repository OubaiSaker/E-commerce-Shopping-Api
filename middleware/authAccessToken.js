const jwt = require('jsonwebtoken');

const authAccessToken = async (req, res, next) => {
    try {
        const accessToken = req.header('x-access-token');
        if (!accessToken) {
            return res.status(401).json({
                status: "failed",
                message: "access denied!"
            });
        }
        const validAccessToken = jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN);
        if (!validAccessToken) {
            return res.status(403).json({
                status: "failed",
                message: "access denied! invalid token"
            });
        }

        req.user = validAccessToken;
        next();
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(500).json({
                status: "failed",
                message: "access token has beeen expired please refresh your token "
            });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(500).json({
                status: "failed",
                message: "invalid access token "
            });
        }
        next(error)
    }
}