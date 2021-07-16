const express = require('express')
const mongoose = require('mongoose')
const Transaction = require('../models/transectionModel')

const transactionRouter = express.Router()

transactionRouter.get('/',async (req,res)=>{
    const transactions = await Transaction.find()
    res.send(transactions)
})

transactionRouter.post('/',async (req,res)=>{
    const data = req.body
    const transaction = new Transaction({
        reason : data.reason,
        amount : parseFloat(data.amount)
    })

    if(data.p_id) transaction.p_id = data.p_id
    if(data.o_id) transaction.o_id = data.o_id

    await transaction.save()

    res.send(transaction)
})

module.exports = transactionRouter