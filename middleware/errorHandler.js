module.exports = function (error, req, res, next) {
    return res.status(500).json({
        status: "falied",
        message: error.message
    })
}