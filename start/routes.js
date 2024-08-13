//import remote modules
const express = require('express');
const logger = require('morgan');
const cors = require('cors')
//import local module
const errorHandler = require('../helpers/errorHandler');
const usersRoute = require('../routes/usersRoute');

module.exports = function (app) {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(logger('dev'));
    app.use(cors());

    app.get('/', (req, res, next) => {
        try {
            res.status(200).json({
                status: "success",
                message: "your request receive"
            })
        }
        catch (error) {
            next(error);
        }
    });
    //use local routes
    app.use('/users', usersRoute);
    app.use(errorHandler);
}