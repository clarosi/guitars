const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const stringConstants = require('./shared/utility/stringConstants');
const numberConstants = require('./shared/utility/numberConstants');

const userRoute = require('./api/routes/user');
const brandRoute = require('./api/routes/brand');
const woodRoute = require('./api/routes/wood');
const productRoute = require('./api/routes/product');

require('dotenv').config();

// Configure app bodyParser() and cookieParser()
// lets us grab data from the body of POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

// this will fix CORS error
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*,Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    next();
});

// Connect to DB if using NoSql DB like MongoDB
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useCreateIndex: true});
// remove deprecation warnings in mongoose
mongoose.Promise = global.Promise;

// Routes
app.use(`${stringConstants.routePrefix}/user`, userRoute);
app.use(`${stringConstants.routePrefix}/product`, brandRoute);
app.use(`${stringConstants.routePrefix}/product`, woodRoute);
app.use(`${stringConstants.routePrefix}/product`, productRoute);

// Unknown routes/end points
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = numberConstants.notFoundNum;
    next(error);
});

// Other errors like db connections etc..
app.use((error, req, res, next) => {
    res.status(error.status || numberConstants.internalServerNum);
    res.json({error: error.message});
});

module.exports = app;