const express = require('express');
const router = express.Router();
const authByCookie = require('../middlewares/authByCookie');
const admin = require('../middlewares/admin');
const numberConstants = require('../../shared/utility/numberConstants');
const brandController = require('../controllers/brand');

router.get('/brands', brandController.brandRetrieveGet);

router.post('/brand', authByCookie, admin, brandController.brandCreatePost);

module.exports = router;