const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const numberConstants = require('../../shared/utility/numberConstants');
const woodController = require('../controllers/wood');

router.get('/woods', woodController.retrieveGet);

router.post('/wood', auth, admin, woodController.createPost);

module.exports = router;