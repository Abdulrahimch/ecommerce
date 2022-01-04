const Cart = require('../models/Cart');
const asyncHandler = require("express-async-handler");
const objectId = require('mongoose').Types.ObjectId;

exports.postCart = asyncHandler(async (req, res, next) => {
    ownerId = req.user.id;
    const cart = await Cart.create({ ownerId: objectId(ownerId) });
    if (cart) {
        res.status(201).json({
            success: {
                cart
            }
        })
    }
    else {
        res.status(400);
        throw new Error('invalid input data');
    } 
});

exports.updateCart = asyncHandler(async (req, res, next) => {
    userId = req.user.id;
    const cartId = req.params.id;
    const cart = await Cart.findById(cartId);
    
    const isCartOwner = (cart.ownerId.toString() === userId);

    if (!isCartOwner) {
        throw new Error('this cart does not belong to you');
    }

    const updatingCart = { productId, quantity } = req.body;
    
    const updatedCart = await Cart.findByIdAndUpdate(cartId, { $push: { products :  updatingCart } }, { new: true });

    if (updatedCart) {
        res.status(201).json({
            success: {
                cart: updatedCart
            }
        })
    }
    else {
        res.status(400);
        throw new Error('invalid input data');
    } 
});

exports.deleteItemFromCart = asyncHandler(async (req, res, next) => {
    userId = req.user.id;
    const cartId = req.params.id;
    const cart = await Cart.findById(cartId);
    const isCartOwner = (cart.ownerId.toString() === userId);

    if (!isCartOwner) {
        throw new Error('this cart does not belong to you');
    };
    const { id } = req.body;
    const deletedProduct = await Cart.findByIdAndUpdate
                            (cartId, { $pull: { products:  { _id: objectId(id) } } }, {new: true});
    res.status(200).json({ 
        success: {
            deletedProduct
     } 
    });
});

exports.deleteCart = asyncHandler(async (req, res, next) => {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (cart) {
        res.status(200).json({
            success: {
                cart
            }
        })
    }
    else {
        res.status(400);
    } 
});

exports.getCart = asyncHandler(async (req, res, next) => {
    const userId = req.params.id;
    const cart = await Cart.findOne({ ownerId: userId });
    if (cart) {
        res.status(200).json({
            success: {
                cart
            }
        })
    }
    else {
        res.status(400);
    } 
});