var guitarModel = require('./../guitar/guitarModel');
var accessoriesModel = require('./../accessories/accessoriesModel');

/**
 * inventoryController.js
 *
 * @description :: Server-side logic for managing all inventory.
 */
module.exports = {

    /**
     * inventoryController.list()
     */
    list: function (req, res) {
        guitarModel.find({ sell_date: null, }, function (err, guitars) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting guitar.',
                    error: err
                });
            }

            accessoriesModel.find({ sell_date: null }, function (err, accessoriess) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting accessories.',
                        error: err
                    });
                }

                var result = guitars.concat(accessoriess);
                return res.json(result);
            });
        });
    },

    /**
     * inventoryController.search()
     */
    search: function (req, res) {
        const select = req.query.select;
        const input = {
            type: '.',
            type1: '.',
            brand_name: '.',
            model_name: '.'
        };
        switch (select) {
            case 'type': input.type = req.query.input;
                input.type1 = 'Any';
                break;
            case 'brand_name': input.brand_name = req.query.input;
                break;
            case 'model_name': input.model_name = req.query.input;
                break;
        }

        guitarModel.find({
            sell_date: null,
            type: { $regex: new RegExp(input.type, "i") },
            brand_name: { $regex: new RegExp(input.brand_name, "i") },
            model_name: { $regex: new RegExp(input.model_name, "i") }
        }, function (err, guitars) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting guitar.',
                    error: err
                });
            }

            accessoriesModel.find({
                sell_date: null,
                guitar_type: { $regex: new RegExp(input.type, "i") },
                product_type: { $regex: new RegExp(input.brand_name, "i") },
                type: { $regex: new RegExp(input.model_name, "i") }
            }, function (err, accessoriess) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting accessories.',
                        error: err
                    });
                }

                var result = guitars.concat(accessoriess);
                return res.json(result);
            });
        });
    },

    /**
     * inventoryController.listGuitars()
     */
    listGuitars: function (req, res) {
        guitarModel.find({ sell_date: null }, function (err, guitars) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting guitar.',
                    error: err
                });
            }

            return res.json(guitars);
        });
    },

    /**
     * inventoryController.listAccessories()
     */
    listAccessories: function (req, res) {
        accessoriesModel.find({ sell_date: null }, function (err, accessoriess) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting accessories.',
                    error: err
                });
            }

            return res.json(accessoriess);
        });
    },
};
