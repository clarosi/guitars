const numberConstant = require('../../shared/utility/numberConstants');

const admin = (req, res, next) => {
    if (req.user.role === 0) return res.status(numberConstant.unAuthorizedNum).json({message: 'Unauthorized role.'});

    next();
};

module.exports = admin;