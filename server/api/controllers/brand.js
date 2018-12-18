const mongoose = require('mongoose');
const numberConstants = require('../../shared/utility/numberConstants');

const Brand = require('../models/brand');

module.exports.createPost = (req, res, next) => {
    const brand = new Brand(req.body);

    brand.save()
    .then(doc => res.status(numberConstants.successNum).json({success: true, doc}))
    .catch(err => res.json({success: false, error: err.message}));
};

module.exports.retrieveGet = (req, res, next) => {
    Brand.find({}, (err, brands) => {
        if (err) return res.json({
            success: false,
            error: err.message
        });

        res.status(numberConstants.successNum).json({
            success: true,
            brands
        });
    });
};