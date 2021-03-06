const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    discount: Number,
    qty: Number,
    margin: Number
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product