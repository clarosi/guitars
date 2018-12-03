const mongoose = require('mongoose');
const numberConstants = require('../../shared/utility/numberConstants');

const Brand = require('../models/brand');

module.exports.brandCreatePost = (req, res, next) => {
    const brand = new Brand(req.body);

    brand.save()
    .then(doc => res.status(numberConstants.successNum).json({doc}))
    .catch(err => res.status(numberConstants.internalServerNum).json({error: err.message}));
};

module.exports.brandRetrieveGet = (req, res, next) => {
    Brand.find({}, (err, brands) => {
        if (err) return res.status(numberConstants.internalServerNum).json({error: err.message});

        res.status(numberConstants.successNum).json({brands});
    });
};