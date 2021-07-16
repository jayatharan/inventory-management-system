const express = require('express')
const Product = require('../models/productModel')

const productRouter = express.Router()

productRouter.get('/', async (req, res) => {
    var products = await Product.find()
    if (!products) {
        products = []
    }
    res.send(products)
})

productRouter.post('/', async (req, res) => {
    const data = req.body
    const product = new Product({
        name: data.name,
        description: data.description,
        price: data.price,
        discount: data.discount,
        qty: data.qty,
        margin: data.margin
    })
    const savedProduct = await product.save()
    res.send(savedProduct)
})

productRouter.get('/:p_id', async (req, res) => {
    const p_id = req.params['p_id']
    var product = await Product.findById(p_id)
    if (product) {
        res.send(product)
    } else {
        product = {}
        res.send(product)
    }
})

productRouter.put('/:p_id', async (req, res) => {
    const p_id = req.params['p_id']
    const data = req.body
    var product = await Product.findById(p_id)
    if (product) {
        product.name = data.name
        product.description = data.description
        product.price = data.price
        product.discount = data.discount
        product.qty = data.qty
        product.margin = data.margin
        await product.save()
    }
    res.send(product)
})

productRouter.delete('/:p_id', async (req, res) => {
    const p_id = req.params['p_id']
    await Product.findByIdAndDelete(p_id)
    res.send("success")
})

module.exports = productRouter