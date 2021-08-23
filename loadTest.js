const loadtest = require('loadtest');

// const options = {
//     url: 'http://localhost:5000',
//     maxRequests: 1000,
//     maxSecounds: 1
// };


// loadtest.loadTest(options, (error, result) =>
// {
//     if (error)
//     {
//         return console.error('Got an error: %s', error);
//     }
//     console.log('Tests run successfully');
// });

const testProductId = "611e63e5c697e6b4b4f83289"

const getProductsData = {
    url: 'http://localhost:5000/product',
    maxRequests: 4,
    maxSecounds: 1,
    method: "GET"
};

loadtest.loadTest(getProductsData, (error, result) => {
    if (error)
    {
        return console.error('Got an error: %s', error);
    }
    console.log('Products Data Load for 4 clients in a secound Tests run successfully');
})

const addNewProduct = {
    url:'http://localhost:5000/product',
    maxRequests:1,
    maxSecounds:1,
    method:'POST',
    contentType:'application/json',
    body:{"name": "Test Product","description": "Test product","price":1000.00 ,"discount": 5,"qty":100,"margin":10}
}

// loadtest.loadTest(addNewProduct, (error, result) => {
//     if (error)
//     {
//         return console.error('Got an error: %s', error);
//     }
//     console.log('Add product to the database within a secound Tests run successfully');
// })

const getProductData = {
    url: 'http://localhost:5000/product/'+testProductId,
    maxRequests: 1,
    maxSecounds: 1,
    method: "GET"
}

loadtest.loadTest(getProductData, (error, result) => {
    if (error)
    {
        return console.error('Got an error: %s', error);
    }
    console.log('Get product Data from the database within a secound Tests run successfully');
})

const updateProductData = {
    url: 'http://localhost:5000/product/'+testProductId,
    maxRequests: 1,
    maxSecounds: 1,
    method: "PUT",
    contentType:'application/json',
    body:{"name": "Test Product updated","description": "Test product","price":1000.00 ,"discount": 5,"qty":100,"margin":10}
}

loadtest.loadTest(updateProductData, (error, result) => {
    if (error)
    {
        return console.error('Got an error: %s', error);
    }
    console.log('Update product Data to the database within a secound Tests run successfully');
})

const placeOrder = {
    url:'http://localhost:5000/order/place_order',
    maxRequests: 1,
    maxSecounds: 10,
    method:'POST',
    contentType:'application/json',
    body:{"name":"Test Customer","phoneNo":"0123456789","address":"Test Address",
        "orderItems":[
            {
                "id":"60f0470f33dd61ecc5c6500d",
                "qty":10
            },
            {
                "id":"60f0477833dd61ecc5c6500f",
                "qty":2
            }
        ]
    }
}

loadtest.loadTest(placeOrder, (error, result) => {
    if (error)
    {
        return console.error('Got an error: %s', error);
    }
    console.log('Place an order to the database within a secound Tests run successfully');
})