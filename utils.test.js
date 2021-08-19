const { reduceQuantity, findDiscount, findProfit, findDiscountedPrice, findSubTotal, findSubTotalWithDiscount, findSubDiscount } = require('./utils')

test('Should reduce quantity of the product', ()=>{
    const qty = reduceQuantity(100,10);
    expect(qty).toBe(90);
});

test('Should calculate the discount amount of the product', ()=>{
    const discount = findDiscount(100,10);
    expect(discount).toBe(10);
});

test('Should calculate the profit amount of the sold product', ()=>{
    const profit = findProfit(100,10);
    expect(profit).toBe(10);
});

test('Should calculate the discounted price of a product',()=>{
    const o_price = findDiscountedPrice(100,10)
    expect(o_price).toBe(90);
});

test('Should calculate the subtotal of a purchased item', ()=>{
    const subTotal = findSubTotal(100,10)
    expect(subTotal).toBe(1000);
});

test('Should calculate the subtotal of a purchased item with discount', ()=>{
    const discountedSubTotal = findSubTotalWithDiscount(100,10)
    expect(discountedSubTotal).toBe(1000)
})

test('Should calculate the subDiscount of a purchased item', ()=>{
    const subDiscount = findSubDiscount(100,10)
    expect(subDiscount).toBe(1000)
})