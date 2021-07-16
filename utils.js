const Product = require('./models/productModel')

const orderDetails = async (data) => {

    var orderItems = []

    var total = 0
    var total_qty = 0
    var total_discount = 0
    var total_with_discount = 0
    var total_profit = 0

    await Promise.all(data.orderItems.map(async (item) => {
        var product = await Product.findById(item.id)
        const price = product.price
        const discount = product.price * (product.discount / 100)
        const profit = product.price * (product.margin / 100)
        const o_price = price - discount
        const orderItem = {
            p_id: product._id,
            name: product.name,
            qty: item.qty,
            o_price: o_price
        }
        orderItems.push(orderItem)
        total += (price * item.qty)
        total_with_discount += (o_price * item.qty)
        total_qty += parseInt(item.qty)
        total_discount += (discount * item.qty)
        total_profit += profit
    }))

    return { orderItems, total_qty, total, total_discount, total_with_discount, total_profit }
}

const updateProductQty = async (orderItems) => {
    await Promise.all(orderItems.map(async (item) => {
        var product = await Product.findById(item.p_id)
        product.qty -= item.qty
        await product.save()
    }))
}

module.exports = { orderDetails, updateProductQty }