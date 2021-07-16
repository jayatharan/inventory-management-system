const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderItemSchema = new Schema({
    p_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    name: String,
    qty: Number,
    o_price: Number
})

const orderSchema = new Schema({
    name: String,
    phoneNo: String,
    address: String,
    products: [orderItemSchema],
    total_qty: Number,
    total: Number,
    total_discount: Number,
    total_with_discount: Number,
    completed: {
        type: Boolean,
        default: false
    },
    total_profit: Number
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order