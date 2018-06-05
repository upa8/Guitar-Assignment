var express = require('express');
var router = express.Router();
var guitarController = require('./guitarController.js');

/*
 * GET
 */
router.get('/', guitarController.list);

/*
 * GET
 */
router.get('/:id', guitarController.show);

/*
 * POST
 */
router.post('/', guitarController.create);

/*
 * PUT
 */
router.put('/:id', guitarController.update);

/*
 * DELETE
 */
router.delete('/:id', guitarController.remove);

/*
 * GET
 */
router.get('/month', guitarController.monthSell);

/*
 * GET
 */
router.get('/month/:month', guitarController.monthSell);

module.exports = router;
