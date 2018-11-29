const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const numberConstants = require('../../shared/utility/numberConstants');

const User = require('../models/user');

const ERR_MSG = 'Auth failed, invalid email or password.';

module.exports.userLogoutGet = (req, res, next) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ''}, (err, doc) => {
        if (err) return res.status(numberConstants.internalServerNum).json({message: err.message});

        res.status(numberConstants.successNum).json({doc});
    });
}

module.exports.userSignUpPost = (req, res, next) => {
    const user = User(req.body);
    user.save()
    .then(doc => res.status(numberConstants.successNum).json({doc}))
    .catch(err => res.status(numberConstants.internalServerNum).json({error: err.message}));
}

module.exports.userSignInPost = (req, res, next) => {
    User.findOne({email: req.body.email})
    .exec()
    .then(user => {
        if (!user) return res.status(numberConstants.internalServerNum).json({isAuth: false, error: ERR_MSG});
        
        bcryptjs.compare(req.body.password, user.password, (err, isMatch) => {
            if (err) return res.status(numberConstants.internalServerNum).json({isAuth: false, error: ERR_MSG});

            if (isMatch) {
                // add callback to sign asynchronously
                const token = jwt.sign({
                    userId: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname
                }, 
                process.env.JWT_KEY, 
                {expiresIn: '2h'});
                    
                User.findOneAndUpdate({_id: user._id}, {token}, (err, doc) => {
                    if (err)  return res.status(numberConstants.internalServerNum).json({isAuth: false, error: ERR_MSG});

                    // return the token in json form and store it in browser's local storage(this will be done in client app)
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
            }
            else
                return res.status(numberConstants.internalServerNum).json({isAuth: false, error: ERR_MSG});
        }); 
    })
    .catch(err => res.status(numberConstants.internalServerNum).json({isAuth: false, error: err.message}));
}