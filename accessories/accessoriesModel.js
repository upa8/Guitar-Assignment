var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accessoriesSchema = new Schema({
	'type': String,
	'product_type': String,
	'guitar_type': String,
	'product_name': String,
	'price': Number,
	'purchase_date': Date,
	'sell_date': { type: Date, default: null }
});

module.exports = mongoose.model('accessories', accessoriesSchema);
