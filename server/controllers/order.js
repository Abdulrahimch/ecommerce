const Order = require('../models/Order');
const asyncHandler = require("express-async-handler");
const objectId = require('mongoose').Types.ObjectId;

exports.postOrder = asyncHandler(async (req, res, next) => {
    ownerId = req.user.id;
    let newOrder = { products, amount, address, status } = req.body;
    newOrder.ownerId = ownerId;
    const order = await Order.create(newOrder);
    if (order) {
        res.status(201).json({
            success: {
                order
            }
        })
    }
    else {
        res.status(400);
        throw new Error('invalid input data');
    } 
});

exports.updateOrder = asyncHandler(async (req, res, next) => {
    userId = req.user.id;
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    
    const isOrderOwner = (order.ownerId.toString() === userId);

    if (!isOrderOwner) {
        throw new Error('this order does not belong to you');
    }

    const updatingOrder = { products, amount, address, status } = req.body;
    
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { $set: updatingOrder }, { new: true });

    if (updatedOrder) {
        res.status(201).json({
            success: {
                order: updatedOrder
            }
        })
    }
    else {
        res.status(400);
        throw new Error('invalid input data');
    } 
});

exports.getOrders = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const orders =  await Order.find({ ownerId: objectId(userId) });

    if (orders) {
        res.status(200).json({
            success: {
                orders
            }
        })
    } else {
        res.status(400);
    }

});

exports.getOrder = asyncHandler(async (req, res, next) => {
    const orderId = req.params.id;
    const order =  await Order.findOne({ _id: objectId(orderId) });

    if (order) {
        res.status(200).json({
            success: {
                order
            }
        })
    } else {
        res.status(400);
    }

});

exports.deleteOrder = asyncHandler(async (req, res, next) => {
    const orderId = req.params.id;
    const order =  await Order.findByIdAndDelete({ _id: objectId(orderId) });

    if (order) {
        res.status(200).json({
            success: {
                order
            }
        })
    } else {
        res.status(400);
    }

});

