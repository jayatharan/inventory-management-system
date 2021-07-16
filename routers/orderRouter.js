const express = require('express')
const Product = require('../models/productModel')
const Order = require('../models/orderModel')
const Transaction = require('../models/transectionModel')

const { orderDetails, updateProductQty } = require('../utils.js')

const orderRouter = express.Router()


orderRouter.get('/new_order', async (req, res) => {
    const orders = await Order.find({ completed: false })
    res.send(orders)
})

orderRouter.get('/completed_order', async (req, res) => {
    var orders = await Order.find({ completed: true })
    res.send(orders)
})

orderRouter.post('/place_order', async (req, res) => {
    const data = req.body
    const { orderItems, total_qty, total, total_discount, total_with_discount, total_profit } = await orderDetails(data)

    const order = new Order({
        name: data.name,
        phoneNo: data.phoneNo,
        address: data.address,
        products: orderItems,
        total_qty,
        total,
        total_discount,
        total_with_discount,
        total_profit
    })

    await order.save()
    res.send(order)
})

orderRouter.get('/complete/:o_id', async (req, res) => {
    const o_id = req.params['o_id']
    var order = await Order.findById(o_id)
    await updateProductQty(order.products)
    order.completed = true
    await order.save()
    const transaction = new Transaction({
        o_id: order._id,
        amount: order.total_profit,
        reason: "Order Profit"
    })
    await transaction.save()
    res.send(order)
})

orderRouter.get('/:o_id', async (req, res) => {
    const o_id = req.params['o_id']
    const order = await Order.findById(o_id)
    res.send(order)
})

orderRouter.delete('/:o_id', async (req, res) => {
    const o_id = req.params['o_id']
    const order = await Order.findByIdAndDelete(o_id)
    res.send("success")
})

module.exports = orderRouter