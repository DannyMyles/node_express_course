const Order = require('../models/orderModel')
const asyncWrapper = require("../middleware/asyncMiddleware");

const createOrder = asyncWrapper( async(req, res)=>{
    const { userId, products, totalAmount,  address, status } = req.body;

    const newOder = new Order({
        userId,
        products,
        totalAmount,
        address,
        status
    })

    const saveOrder = await newOder.save();
    res.status(201).json({saveOrder})

})

const getAllorders = asyncWrapper( async(req, res)=>{
    const orders = Order.find({})
    console.log("orders", orders)
    if(!orders){
        res(200).json({orders})
    }
    res.status(201).json({orders})
})

module.exports = {
    createOrder,
    getAllorders
} 