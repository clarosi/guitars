const jwt = require('jsonwebtoken');
const numberConstants = require('../../shared/utility/numberConstants');

const User = require('../models/user');

const ERR_MSG = 'Unauthorized user is not allowed.';

module.exports = (req, res, next) => {  
    let token = null;
    // get the token in header
    if (req.headers.authorization !== undefined)
        token = req.headers.authorization.split(' ')[1];
    // if not in header get the token in query string
    if (!token)
        token = req.query.token;
    try {
        const user = jwt.verify(token, process.env.JWT_KEY);
        
        User.findOne({_id: user.userId}, (err, doc) => {
            if (err)  return res.status(numberConstants.unAuthorizedNum).json({
                isAuth: false, 
                error: ERR_MSG
            });

            req.user = doc;
            next();
        });  
    }
    catch (err) {
        return res.status(numberConstants.unAuthorizedNum).json({
            isAuth: false, 
            error: ERR_MSG
        });
    }
};