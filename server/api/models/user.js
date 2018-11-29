const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const SALT = 10;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    firstname: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
});

userSchema.pre('save', function(next) {
    const user = this;

    if (user.isModified('password')) {
        bcryptjs.genSalt(SALT, (err, salt) => {
            if (err) return next(err);
        
            bcryptjs.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});

userSchema.statics.findByToken = function(token, cb) {
    // since we are inside a function declaration
    // this keyword refers to the caller of the function which is "User"
    const user = this;

    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
        if (err) return cb(err, null);
        
        user.findOne({_id: decode.userId, token}, (err, user) => {
            if (err) return cb(err, null);
            cb(null, user);
        });
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;