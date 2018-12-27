const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const numberConstants = require('../../shared/utility/numberConstants');
const siteController = require('../controllers/site');

router.get('/site_info', siteController.getSiteInfo);

router.post('/site_info', auth, admin, siteController.updateSiteInfo)

module.exports = router;