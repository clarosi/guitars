const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const numberConstants = require('../../shared/utility/numberConstants');
const productController = require('../controllers/product');

// By Arrival
//articles?sortBy=createdAt&order=desc&limit=4

// By Sold
//articles?sortBy=sold&order=desc&limit=4
router.get('/articles', productController.findArticlesGet);

//articles_by_id?id=xxx,yyy,zzz&type=single
router.get('/articles_by_id', productController.findArticleByIdGet);

router.post('/shop', productController.getByFiltersPost);

router.post('/article', auth, admin, productController.addArticlePost);

module.exports = router;