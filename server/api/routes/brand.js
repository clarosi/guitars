const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const numberConstants = require('../../shared/utility/numberConstants');
const brandController = require('../controllers/brand');

router.get('/brands', brandController.retrieveGet);

router.post('/brand', auth, admin, brandController.createPost);

module.exports = router;