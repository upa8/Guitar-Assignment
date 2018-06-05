var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var guitarSchema = new Schema({
	'brand_name': String,
	'model_name': String,
	'type': String,
	'string_number': Number,
	'image': String,
	'price': Number,
	'purchase_date': Date,
	'sell_date': { type: Date, default: null }
});

module.exports = mongoose.model('guitar', guitarSchema);
