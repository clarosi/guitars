const mongoose = require('mongoose');
const numberConstants = require('../../shared/utility/numberConstants');

const Wood = require('../models/wood');

module.exports.createPost = (req, res, next) => {
    const wood = new Wood(req.body);

    wood.save()
    .then(doc => res.status(numberConstants.successNum).json({success: true, doc}))
    .catch(err => res.json({success: false, error: err.message}));
};

module.exports.retrieveGet = (req, res, next) => {
    Wood.find({}, (err, woods) => {
        if (err) return res.json({success: false, error: err.message});

        res.status(numberConstants.successNum).json({success: true, woods});
    });
};