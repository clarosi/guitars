const User = require('../models/user');
const numberConstants = require('../../shared/utility/numberConstants');

const ERR_MSG = 'Unauthorized user is not allowed.';

const authByCookie = (req, res, next) => {
    const token = req.cookies.w_auth;

    User.findByToken(token, (err, user) => {
        if (err) return res.status(numberConstants.unAuthorizedNum).json({isAuth: false, message: ERR_MSG});

        if (!user) return res.status(numberConstants.unAuthorizedNum).json({isAuth: false, message: ERR_MSG});

        req.token = token;                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        req.user = user;
        next();
    });
};

module.exports = authByCookie;
