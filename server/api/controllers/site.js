const mongoose = require('mongoose');
const numberConstants = require('../../shared/utility/numberConstants');

const Site = require('../models/site');

module.exports.getSiteInfo = (req, res, next) => {
    Site.find({}, (err, info) => {
        if (err) return res.json({success: false, error: err.message});

        res.status(numberConstants.successNum).json({success: true, siteInfo: info[0].siteInfo});
    });
};

module.exports.updateSiteInfo = (req, res, next) => {
    Site.findOneAndUpdate(
        {name: 'site'},
        {'$set': {siteInfo: req.body}},
        {new: true},
        (err, doc) => {
            if (err) return res.json({success: false, error: err.message});

            res.status(numberConstants.successNum).json({success: true, siteInfo: doc.siteInfo});
        }
    );
};