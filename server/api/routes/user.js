const express = require('express');
const router = express.Router();
const formidable = require('express-formidable');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const numberConstants = require('../../shared/utility/numberConstants');
const userController = require('../controllers/user');

router.get('/auth', auth, (req, res, next) => {
    res.status(numberConstants.successNum).json({
        isAuth: true, 
        isAdmin: req.user.role === 1 ? true : false,
        user: req.user
    });
});

router.get('/remove_image', auth, admin, userController.removeImageGet);

router.post('/upload_image', auth, admin, formidable(), userController.uploadImagePost);

router.get('/logout', auth, userController.logoutGet);

router.get('/remove_from_cart', auth, userController.removeFromCartGet);

router.post('/success_payment', auth, userController.successPayment);

router.post('/signin', userController.signInPost);

router.post('/signup', userController.signUpPost);

router.post('/add_to_cart_user', auth, userController.addToCartUserPost);

module.exports = router;