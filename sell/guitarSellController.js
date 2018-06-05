var guitarModel = require('./../guitar/guitarModel.js');

/**
 * guitarSellController.js
 *
 * @description :: Server-side logic for managing guitar sells.
 */
module.exports = {

    /**
     * guitarController.monthSell()
     */
    monthSell: function (req, res) {
        var month = new Date().getMonth() + 1;
        if (parseInt(req.params.month)) {
            month = parseInt(req.params.month);
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
                    message: 'Error when getting guitar month sells.',
                    error: err
                });
            }
            return res.json(guitar);
        });
    }
};
