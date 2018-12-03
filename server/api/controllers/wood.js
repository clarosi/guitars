const mongoose = require('mongoose');
const numberConstants = require('../../shared/utility/numberConstants');

const Wood = require('../models/wood');

module.exports.woodCreatePost = (req, res, next) => {
    const wood = new Wood(req.body);

    wood.save()
    .then(doc => res.status(numberConstants.successNum).json({doc}))
    .catch(err => res.status(numberConstants.internalServerNum).json({error: err.message}));
};

module.exports.woodRetrieveGet = (req, res, next) => {
    Wood.find({}, (err, woods) => {
        if (err) return res.status(numberConstants.internalServerNum).json({error: err.message});

        res.status(numberConstants.successNum).json({woods});
    });
};