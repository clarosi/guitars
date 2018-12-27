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
const siteRoute = require('./api/routes/site');

// lets us define an invironment variables inside .env file
require('dotenv').config();

// Configure app bodyParser() and cookieParser()
// lets us grab data from the body of POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

// For production only
if (process.env.NODE_ENV === stringConstants.production) {
    app.use(express.static('client/build'));
}

// this will fix CORS error
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*,Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    next();
});

// Connect to DB if using NoSql DB like MongoDB
const options = {
  useNewUrlParser: true,
  useCreateIndex: true
};

if (process.env.NODE_ENV === stringConstants.production) {
    options.auth =  {user: process.env.MONGO_ATLAS_USR, password: process.env.MONGO_ATLAS_PSW};
}

mongoose.connect(stringConstants.mongoDbConStr, options);
// remove deprecation warnings in mongoose
mongoose.Promise = global.Promise;

// Routes
app.use(`${stringConstants.routePrefix}/user`, userRoute);
app.use(`${stringConstants.routePrefix}/product`, brandRoute);
app.use(`${stringConstants.routePrefix}/product`, woodRoute);
app.use(`${stringConstants.routePrefix}/product`, productRoute);
app.use(`${stringConstants.routePrefix}/site`, siteRoute);

// For production only
if (process.env.NODE_ENV === stringConstants.production) {
    const path = require('path');

    app.get('/*', (req, res) => {
        res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
}

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