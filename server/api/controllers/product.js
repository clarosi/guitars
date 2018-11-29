const mongoose = require('mongoose');
const numberConstants = require('../../shared/utility/numberConstants');

const Product = require('../models/product');

module.exports.productGetByFiltersPost = (req, res, next) => {
    const body = req.body;
    const order = body.order ? body.order : 'desc';
    const sortBy = body.sortBy ? body.sortBy : '_id';
    const limit = body.limit ? parseInt(body.limit, 10) : 48;
    const skip = body.skip ? parseInt(body.skip, 10) : 0;
    let args = {};

    for (const key in body.filters) {
        if (body.filters[key].length > 0) {
            if (key === 'price') {
                args[key] = {
                    $gte: body.filters[key][0],
                    $lte: body.filters[key][1]
                }
            }
            else {
                args[key] = body.filters[key];
            }
        }
    }

    args['publish'] = true;

    Product.find(args)
    .populate('brand')
    .populate('wood')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec()
    .then(doc => res.status(numberConstants.successNum).json({
        size: doc.length,
        articles: doc
    }))
    .catch(err => res.status(numberConstants.internalServerNum).json({error: err.message}));
}

module.exports.productdAddArticlePost = (req, res, next) => {
    const product = new Product(req.body);

    product.save()
    .then(doc => res.status(numberConstants.successNum).json({doc}))
    .catch(err => res.status(numberConstants.internalServerNum).json({error: err.message}));
}

module.exports.productdFindArticlesGet = (req, res, next) => {
    const query = req.query;
    const sortBy = query.sortBy ? query.sortBy : '_id';
    const order = query.order ? query.order : 'asc';
    const limit = query.limit ?  parseInt(query.limit, 10) : 100;

    Product.find({})
    .populate('brand')
    .populate('wood')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec()
    .then(doc => res.status(numberConstants.successNum).json({doc}))
    .catch(err => res.status(numberConstants.internalServerNum).json({error: err.message}));
}

module.exports.productFindArticleByIdGet = (req, res, next) => {
    let items = req.query.id;
    const type = req.query.type;

    if (type === 'array') {
        let _ids = items.split(',');
        items = [];
        items =  _ids.map(_id => mongoose.Types.ObjectId(_id))
    }

    Product.find({_id: {$in: items}})
    .populate('brand')
    .populate('wood')
    .exec()
    .then(doc => res.status(numberConstants.successNum).json({doc}))
    .catch(err => res.status(numberConstants.internalServerNum).json({error: err.message}));
}
