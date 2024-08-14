const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    let errorMessages = [];
    if (!errors.isEmpty()) {
        errors.errors.forEach(element => {
            errorMessages.push(element.msg)
        });
        return res.status(400)
            .json({
                success: false,
                msg: "Errors",
                errors: errorMessages
            });
    }
    next();
}

module.exports = validate;