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

        //const discount = product.price * (product.discount / 100)
        const discount = findDiscount(product.price,product.discount)

        //const profit = product.price * (product.margin / 100)
        const profit = findProfit(product.price,product.margin)
        
        //const o_price = price - discount
        const o_price = findDiscountedPrice(price,discount)
        
        const orderItem = {
            p_id: product._id,
            name: product.name,
            qty: item.qty,
            o_price: o_price
        }
        orderItems.push(orderItem)
        //total += (price * item.qty)
        total += findSubTotal(price,item.qty)

        //total_with_discount += (o_price * item.qty)
        total_with_discount += findSubTotalWithDiscount(o_price,item.qty)

        total_qty += parseInt(item.qty)

        //total_discount += (discount * item.qty)
        total_discount += findSubDiscount(discount,item.qty)

        total_profit += profit
    }))

    return { orderItems, total_qty, total, total_discount, total_with_discount, total_profit }
}

const updateProductQty = async (orderItems) => {
    await Promise.all(orderItems.map(async (item) => {
        var product = await Product.findById(item.p_id)
        //product.qty -= item.qty
        product.qty = reduceQuantity(product.qty,item.qty)
        await product.save()
    }))
}

const reduceQuantity = (p_qty,i_qty) => {
    return p_qty-i_qty
}

const findDiscount = (p_price,p_discount) => {
    return p_price * (p_discount / 100)
}

const findProfit = (p_price,p_margin) => {
    return p_price * (p_margin / 100)
}

const findDiscountedPrice = (price,discount) =>  {
    return price - discount
}

const findSubTotal = (price,qty) => {
    return price*qty
}

const findSubTotalWithDiscount = (price,qty) => {
    return price*qty
}

const findSubDiscount = (discount,qty) => {
    return discount * qty
}

module.exports = { orderDetails, updateProductQty, reduceQuantity, findDiscount, findProfit, findDiscountedPrice, findSubTotal, findSubTotalWithDiscount, findSubDiscount }