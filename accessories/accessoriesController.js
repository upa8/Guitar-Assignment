var accessoriesModel = require('./accessoriesModel.js');

/**
 * accessoriesController.js
 *
 * @description :: Server-side logic for managing accessoriess.
 */
module.exports = {

    /**
     * accessoriesController.list()
     */
    list: function (req, res) {
        accessoriesModel.find(function (err, accessoriess) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting accessories.',
                    error: err
                });
            }
            return res.json(accessoriess);
        });
    },

    /**
     * accessoriesController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        accessoriesModel.findOne({_id: id}, function (err, accessories) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting accessories.',
                    error: err
                });
            }
            if (!accessories) {
                return res.status(404).json({
                    message: 'No such accessories'
                });
            }
            return res.json(accessories);
        });
    },

    /**
     * accessoriesController.create()
     */
    create: function (req, res) {
        var accessories = new accessoriesModel({
			type : req.body.type,
			product_type : req.body.product_type,
			guitar_type : req.body.guitar_type,
			price : req.body.price,
			purchase_date : req.body.purchase_date,
			sell_date : req.body.sell_date

        });

        accessories.save(function (err, accessories) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating accessories',
                    error: err
                });
            }
            return res.status(201).json(accessories);
        });
    },

    /**
     * accessoriesController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        accessoriesModel.findOne({_id: id}, function (err, accessories) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting accessories',
                    error: err
                });
            }
            if (!accessories) {
                return res.status(404).json({
                    message: 'No such accessories'
                });
            }

            accessories.type = req.body.type ? req.body.type : accessories.type;
			accessories.product_type = req.body.product_type ? req.body.product_type : accessories.product_type;
			accessories.guitar_type = req.body.guitar_type ? req.body.guitar_type : accessories.guitar_type;
			accessories.price = req.body.price ? req.body.price : accessories.price;
			accessories.purchase_date = req.body.purchase_date ? req.body.purchase_date : accessories.purchase_date;
			accessories.sell_date = req.body.sell_date ? req.body.sell_date : accessories.sell_date;
			
            accessories.save(function (err, accessories) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating accessories.',
                        error: err
                    });
                }

                return res.json(accessories);
            });
        });
    },

    /**
     * accessoriesController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        accessoriesModel.findByIdAndRemove(id, function (err, accessories) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the accessories.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
