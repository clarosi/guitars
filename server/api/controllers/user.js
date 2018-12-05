const mongoose = require('mongoose');
const cloudinary = require('cloudinary');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const numberConstants = require('../../shared/utility/numberConstants');

const User = require('../models/user');

const ERR_MSG = 'Auth failed, invalid email or password.';

cloudinary.config({
    cloud_name: 'clarosian',
    api_key: '999325945145299',
    api_secret: 'SfZuXqVEKmPJ7MBJKJ2kL0j0GBA'
});

module.exports.userLogoutGet = (req, res, next) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ''}, (err, doc) => {
        if (err) return res.status(numberConstants.internalServerNum).json({message: err.message});

        res.status(numberConstants.successNum).json({doc});
    });
};

module.exports.userRemoveImageGet = (req, res, next) => {
    const public_id = req.query.public_id;

    cloudinary.uploader.destroy(public_id, (err, doc) => {
        res.status(numberConstants.successNum).json({removeSuccess: true});
    });
};

module.exports.userUploadImagePost = (req, res, next) => {
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

module.exports.userSignUpPost = (req, res, next) => {
    const user = User(req.body);
    user.save()
    .then(doc => res.status(numberConstants.successNum).json({doc}))
    .catch(err => res.status(numberConstants.internalServerNum).json({error: err.message}));
};

module.exports.userAddToCartUserPost = (req, res, next) => {
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
                    if (err) return res.status(numberConstants.internalServerNum).json({
                        doc: [], 
                        error: err
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
                if (err) return res.status(numberConstants.internalServerNum).json({
                    doc: [], 
                    error: err
                });

                res.status(numberConstants.successNum).json({doc: doc.cart});
            });
        }
    })
    .catch(err => {

    });
};

module.exports.userSignInPost = (req, res, next) => {
    User.findOne({email: req.body.email})
    .exec()
    .then(user => {
        if (!user) return res.status(numberConstants.internalServerNum).json({isAuth: false, error: ERR_MSG});
        
        bcryptjs.compare(req.body.password, user.password, (err, isMatch) => {
            if (err) return res.status(numberConstants.internalServerNum).json({isAuth: false, error: ERR_MSG});

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
                        if (err)  return res.status(numberConstants.internalServerNum).json({isAuth: false, error: ERR_MSG});
                        
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
                return res.status(numberConstants.internalServerNum).json({isAuth: false, error: ERR_MSG});
        }); 
    })
    .catch(err => res.status(numberConstants.internalServerNum).json({isAuth: false, error: err.message}));
};