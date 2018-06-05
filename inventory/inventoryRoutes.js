var express = require('express');
var router = express.Router();
var inventoryController = require('./inventoryController');

/*
 * GET
 */
router.get('/', inventoryController.list);

/*
 * GET
 */
router.get('/search', inventoryController.search);

/*
 * GET
 */
router.get('/guitars', inventoryController.listGuitars);

/*
 * GET
 */
router.get('/accessories', inventoryController.listAccessories);

module.exports = router;
