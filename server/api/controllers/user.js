const mongoose = require('mongoose');
const cloudinary = require('cloudinary');
const async = require('async');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const numberConstants = require('../../shared/utility/numberConstants');

const User = require('../models/user');
const Product = require('../models/product');
const Payment = require('../models/payment');

const ERR_MSG = 'Auth failed, invalid email or password.';

cloudinary.config({
    cloud_name: 'clarosian',
    api_key: '999325945145299',
    api_secret: 'SfZuXqVEKmPJ7MBJKJ2kL0j0GBA'
});

module.exports.logoutGet = (req, res, next) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ''}, (err, doc) => {
        if (err) return res.json({error: err.message});

        res.status(numberConstants.successNum).json({doc});
    });
};

module.exports.removeFromCartGet = (req, res, next) => {
    User.findOneAndUpdate({_id: req.user._id},
        {'$pull': 
            {'cart': {'id': mongoose.Types.ObjectId(req.query.id)}}
        },
        {new: true},
        (err, doc) => {
            const cart = doc.cart;
            const array = cart.map(item => {
                return mongoose.Types.ObjectId(item.id);
            });

            Product.find({'_id': {$in: array}})
            .populate('brand')
            .populate('wood')
            .exec((err, cartDetails) => {
                if (err) return res.json({
                    cart: [],
                    cartDetails: []
                });
                return res.status(numberConstants.successNum).json({
                    cart,
                    cartDetails
                });
            });
        }
    );
};

module.exports.removeImageGet = (req, res, next) => {
    const public_id = req.query.public_id;

    cloudinary.uploader.destroy(public_id, (err, doc) => {
        res.status(numberConstants.successNum).json({removeSuccess: true});
    });
};

module.exports.uploadImagePost = (req, res, next) => {
    cloudinary.uploader.upload(req.files.image.path, result => {
        res.status(numberConstants.successNum).send({
           public_id: result.public_id,
           url: result.url
        });
    }, {
        public_id: `image_${Date.now()}`,
        resource_type: 'auto'
    }
    ); 
};

module.exports.updateProfile = (req, res, next) => {
    User.findOneAndUpdate(
        {_id: req.user._id},
        {'$set': req.body},
        {new: true},
        (err, doc) => {
            if (err) return res.json({
                success: false, 
                message: err.message
            });

            res.status(numberConstants.successNum).json({success: true});
        }
    );
};

module.exports.successPayment = (req, res, next) => {
    const history = [];
    let transData = {};

    // user history
    req.body.cartDetails.forEach(item => {
        history.push({
            dateOfPurchase: Date.now(),
            name: item.name,
            brand: item.brand.name,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        });
    });

    // Payment Dash
    transData.user = {
        id: req.user._id,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        email: req.user.email
    };
    transData.paymentData = req.body.paymentData.paymentID;
    transData.product = history;

    User.findOneAndUpdate(
        {_id: req.user._id},
        {$push: {history: history}, $set: {cart: []}},
        {new: true},
        (err, user) => {
            if (err) return res.json({success: false, error: err.message});

            const payment = new Payment(transData);
            payment.save((err, doc) => {
                if (err) return res.json({success: false, error: err.message});

                const products = [];
                doc.product.forEach(item => {
                    products.push({id: item.id, quantity: item.quantity});
                });

                async.eachSeries(products, (item, callback) => {
                    Product.update(
                        {_id: item.id},
                        { $inc: {'sold': item.quantity}},
                        {new: false},
                        callback
                    );
                }, (err) => {
                    if (err) return res.json({success: false, error: err.message});
                    
                    res.status(numberConstants.successNum).json({
                        success: true,
                        cart: [],
                        cartDetails: []
                    });
                });
            });
        }
    );
};

module.exports.signUpPost = (req, res, next) => {
    const user = User(req.body);
    user.save()
    .then(doc => res.status(numberConstants.successNum).json({success: true, doc}))
    .catch(err => res.json({success: false, error: err.message}));
};

module.exports.addToCartUserPost = (req, res, next) => {
    User.findOne({_id: req.user._id})
    .exec()
    .then(user => {
        let duplicate = false;

        user.cart.forEach(item => {
            if (item.id.toString() === req.query.id) {
                duplicate = true;
            }
        });

        if (duplicate) {
            User.findOneAndUpdate({_id: req.user._id, 'cart.id': mongoose.Types.ObjectId(req.query.id)},
                {$inc: {'cart.$.quantity': 1}},
                {new: true},
                (err, doc) => {
                    if (err) return res.json({
                        doc: [], 
                        error: err.message
                    });

                    res.status(numberConstants.successNum).json({doc: doc.cart});
                }
            )
        }
        else {
            User.findOneAndUpdate({_id: req.user._id}, {
                $push: {
                    cart: {
                        id: mongoose.Types.ObjectId(req.query.id),
                        quantity: 1,
                        date: Date.now()
                    }
                }
            }, 
            {new: true}, (err, doc) => {
                if (err) return res.json({
                    doc: [], 
                    error: err.message
                });

                res.status(numberConstants.successNum).json({doc: doc.cart});
            });
        }
    })
};

module.exports.signInPost = (req, res, next) => {
    User.findOne({email: req.body.email})
    .exec()
    .then(user => {
        if (!user) return res.json({isAuth: false, error: ERR_MSG});
        
        bcryptjs.compare(req.body.password, user.password, (err, isMatch) => {
            if (err) return res.json({isAuth: false, error: ERR_MSG});

            if (isMatch) {
                // asynchronously sign 
                jwt.sign({
                    userId: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname
                }, 
                process.env.JWT_KEY, 
                {expiresIn: '2h'}, 
                (err, token) => {                
                    User.findOneAndUpdate({_id: user._id}, {token}, {new: true}, (err, doc) => {
                        if (err)  return res.json({isAuth: false, error: ERR_MSG});
                        
                        return res.status(numberConstants.successNum).json({
                            isAuth: true, 
                            isAdmin: doc.role === 1 ? true : false,
                            user: doc
                        });

                        // store the token in cookie
                        // res.cookie('w_auth', token).status(numberConstants.successNum).json({
                        //     isAuth: true, 
                        //     isAdmin: doc.role === 1 ? true : false,
                        //     user: doc
                        // });
                    });
                });
            }
            else
                return res.json({isAuth: false, error: ERR_MSG});
        }); 
    })
    .catch(err => res.json({isAuth: false, error: err.message}));
};