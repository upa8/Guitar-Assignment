var express = require('express');
var router = express.Router();
var guitarSellController = require('./guitarSellController.js');

/*
 * GET
 */
router.get('/', guitarSellController.monthSell);

/*
 * GET
 */
router.get('/:month', guitarSellController.monthSell);

module.exports = router;
