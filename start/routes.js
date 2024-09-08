//import remote modules
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('node:path');
//import local module
const errorHandler = require('../helpers/errorHandler');
const homeRoute = require('../routes/homeRoute');
const indexRoute = require('../routes/indexRoute');
const usersRoute = require('../routes/usersRoute');
const productsRoute = require('../routes/productsRoute');
const cartsRoute = require('../routes/cartsRoute');
const ordersRoute = require('../routes/ordersRoute');
const checkoutRoute = require('../routes/checkoutRoute');

module.exports = function (app) {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(logger('dev'));
    app.use(cors());
    app.use(express.static(path.join(__dirname, 'public')))
    //use local routes
    app.use('/', indexRoute);
    app.use('/home', homeRoute);
    app.use('/users', usersRoute);
    app.use('/products', productsRoute);
    app.use('/carts', cartsRoute);
    app.use('/orders', ordersRoute);
    app.use('/checkout', checkoutRoute)
    app.use(errorHandler);
}