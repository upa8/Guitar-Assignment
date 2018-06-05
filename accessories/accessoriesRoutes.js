var express = require('express');
var router = express.Router();
var accessoriesController = require('./accessoriesController.js');

/*
 * GET
 */
router.get('/', accessoriesController.list);

/*
 * GET
 */
router.get('/:id', accessoriesController.show);

/*
 * POST
 */
router.post('/', accessoriesController.create);

/*
 * PUT
 */
router.put('/:id', accessoriesController.update);

/*
 * DELETE
 */
router.delete('/:id', accessoriesController.remove);

module.exports = router;
