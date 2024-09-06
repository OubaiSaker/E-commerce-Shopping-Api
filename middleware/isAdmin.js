const isAdmin = async (req, res, next) => {
    try {
        const role = req.user.role;
        if (role !== "admin") {
            return res.status(401).json({
                status: "failed",
                message: "admin only can access to this point"
            });
        }
        else {
            next();
        }
    }
    catch (error) {
        next(error);
    }
}

module.exports = isAdmin;