const express = require('express');
const guitar = require('./guitar/guitarRoutes');
const accessories = require('./accessories/accessoriesRoutes');
const sell = require('./sell/guitarSellRoutes');
const inventory = require('./inventory/inventoryRoutes');
const app = express();
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://guitaruser:guitarUSER@ds261969.mlab.com:61969/guitarstore');
// mongoose.connect('mongodb://localhost/guitarstore');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/guitar', guitar);
app.use('/accessories', accessories);
app.use('/sell', sell);
app.use('/inventory', inventory);

app.listen(3000, () => console.log('Example app listening on port 3000!'));