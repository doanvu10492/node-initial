const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title:String,
    description: String,
    price: Number,
    company: String
},{
    timestamps : true
});

module.exports = mongoose.model('Product', productSchema);