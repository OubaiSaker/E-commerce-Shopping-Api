const { check } = require('express-validator');

module.exports.signUpValidator = [
    check('userName').not().isEmpty().withMessage("user name is required"),
    check('userName').isLength({ min: 4 }).withMessage("user name must be at least contain 4 character"),
    check('email').not().isEmpty().withMessage("email is required"),
    check('email').isEmail().withMessage("please enter avalid email"),
    check('password').not().isEmpty().withMessage("password is required"),
    check('password').isLength({ min: 6, max: 24 }).withMessage("password length must be between 6 and 24 character"),
    check('password').isStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("password must be contain at least 1 lowercase letter ,one uppercase letter ,one number ,and one symbol"),
    check('confirm-password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("password and confirm password not matched")
        }
        return true;
    })
]

module.exports.signInValidator = [
    check('email').not().isEmpty().withMessage("email is required"),
    check('email').isEmail().withMessage("please enter avalid email"),
    check('password').not().isEmpty().withMessage("password is required"),
]

module.exports.updateUserValidator = [
    check('userName').not().isEmpty().withMessage("user naem is required"),
    check('userName').isLength({ min: 4 }).withMessage("user name must be at least contain 4 character"),
    check('email').not().isEmpty().withMessage("email is required"),
    check('email').isEmail().withMessage("please enter avalid email")
]

module.exports.updatePasswordValidator = [
    check('newPassword').not().isEmpty().withMessage("password is required"),
    check('newPassword').isLength({ min: 6, max: 24 }).withMessage("newPlength must be between 6 and 24 character"),
    check('newPassword').isStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("password must be contain at least 1 lowercase letter ,one uppercase letter ,one number ,and one symbol"),
    check('confirm-password').custom((value, { req }) => {
        if (value !== req.body.newPassword) {
            throw new Error("password and confirm password not matched")
        }
        return true;
    })
]