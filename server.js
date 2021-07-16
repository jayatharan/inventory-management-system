const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const productRouter = require('./routers/productRouter')
const orderRouter = require('./routers/orderRouter')
const transactionRouter = require('./routers/transactionRouter')

const dbURI = 'mongodb+srv://jayatharan:1234@cluster0.6qbug.mongodb.net/ecomApp?retryWrites=true&w=majority'
const app = express()


app.use(express.json())
app.use(cors())

app.use('/product', productRouter)
app.use('/order', orderRouter)
app.use('/transaction', transactionRouter)

app.get('/', (req, res) => {
    res.send("App is running")
})


mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((res) => {
        console.log("DB Connection successful")
        app.listen(5000, () => {
            console.log("Server is listining on port 5000")
        })
    })
    .catch((err) => {
        console.log(err)
    })
