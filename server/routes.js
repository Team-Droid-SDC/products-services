const router = require('express').Router();
const model = require('./model.js');

router.get('/products', model.products);
router.get('/products/:product_id', model.product);
router.get('/products/:product_id/styles', model.styles);
router.get('/products/:product_id/related', model.related);

module.exports = router;