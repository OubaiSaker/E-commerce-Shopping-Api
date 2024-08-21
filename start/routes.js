//import remote modules
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('node:path');
//import local module
const errorHandler = require('../helpers/errorHandler');
const usersRoute = require('../routes/usersRoute');

module.exports = function (app) {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(logger('dev'));
    app.use(cors());
    app.use(express.static(path.join(__dirname, 'public')))
    //use local routes
    app.use('/users', usersRoute);
    app.use(errorHandler);
}