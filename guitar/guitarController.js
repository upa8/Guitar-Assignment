var guitarModel = require('./guitarModel.js');

/**
 * guitarController.js
 *
 * @description :: Server-side logic for managing guitars.
 */
module.exports = {

    /**
     * guitarController.list()
     */
    list: function (req, res) {
        guitarModel.find(function (err, guitars) {
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
     * guitarController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        guitarModel.findOne({ _id: id }, function (err, guitar) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting guitar.',
                    error: err
                });
            }
            if (!guitar) {
                return res.status(404).json({
                    message: 'No such guitar'
                });
            }
            return res.json(guitar);
        });
    },

    /**
     * guitarController.create()
     */
    create: function (req, res) {
        var guitar = new guitarModel({
            brand_name: req.body.brand_name,
            model_name: req.body.model_name,
            type: req.body.type,
            string_number: req.body.string_number,
            price: req.body.price,
            purchase_date: req.body.purchase_date,
            sell_date: req.body.sell_date

        });

        guitar.save(function (err, guitar) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating guitar',
                    error: err
                });
            }
            return res.status(201).json(guitar);
        });
    },

    /**
     * guitarController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        guitarModel.findOne({ _id: id }, function (err, guitar) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting guitar',
                    error: err
                });
            }
            if (!guitar) {
                return res.status(404).json({
                    message: 'No such guitar'
                });
            }

            guitar.brand_name = req.body.brand_name ? req.body.brand_name : guitar.brand_name;
            guitar.model_name = req.body.model_name ? req.body.model_name : guitar.model_name;
            guitar.type = req.body.type ? req.body.type : guitar.type;
            guitar.string_number = req.body.string_number ? req.body.string_number : guitar.string_number;
            guitar.price = req.body.price ? req.body.price : guitar.price;
            guitar.purchase_date = req.body.purchase_date ? req.body.purchase_date : guitar.purchase_date;
            guitar.sell_date = req.body.sell_date ? req.body.sell_date : guitar.sell_date;

            guitar.save(function (err, guitar) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating guitar.',
                        error: err
                    });
                }

                return res.json(guitar);
            });
        });
    },

    /**
     * guitarController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        guitarModel.findByIdAndRemove(id, function (err, guitar) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the guitar.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    /**
     * guitarController.monthSell()
     */
    monthSell: function (req, res) {
        var month = new ISODate().getMonth() + 1;
        if (req.params.id) {
            month = req.params.id;
        }
        var params = [
            { "$match": { "sell_date": { "$ne": null } } },
            {
                "$project": {
                    "brand_name": "$brand_name",
                    "model_name": "$model_name",
                    "type": "$type",
                    "string_number": "$string_number",
                    "price": "$price",
                    "purchase_date": "$purchase_date",
                    "sell_date": "$sell_date",
                    "month_sell_date": { "$month": "$sell_date" }
                }
            },
            { "$match": { "month_sell_date": month } }
        ];
        guitarModel.aggregate(params, function (err, guitar) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting month sells the guitar.',
                    error: err
                });
            }
            return res.json(guitar);
        });
    }
};
