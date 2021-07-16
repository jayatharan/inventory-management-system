const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    p_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    o_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    reason: String,
    amount: Number

},
    {
        timestamps: true
    }
)

const Transaction = mongoose.model('Transection', transactionSchema)

module.exports = Transaction