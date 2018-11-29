const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const numberConstants = require('../../shared/utility/numberConstants');
const userController = require('../controllers/user');

router.get('/auth', auth, (req, res, next) => {
    res.status(numberConstants.successNum).json({
        isAuth: true, 
        isAdmin: req.user.role === 1 ? true : false,
        user: req.user
    });
});

router.get('/logout', auth, userController.userLogoutGet);

router.post('/signin', userController.userSignInPost);

router.post('/signup', userController.userSignUpPost);

module.exports = router;