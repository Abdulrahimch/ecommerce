const Product = require('../models/Product');
const asyncHandler = require("express-async-handler");
const { query } = require('express');

exports.postProduct = asyncHandler(async (req, res, next) => {
    let newProduct = { title, desc, img, price, size, categories, color } = req.body;
    newProduct.ownerId = req.user.id;
    const product = await Product.create(newProduct);
    if (product) {
        res.status(201).json({
            success: {
                product
            }
        })
    }
    else {
        res.status(400);
        throw new Error('invalid input data');
    } 
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const productId = req.params.id;
    const product = await Product.findById(productId);

    const isProductOwner = (product.ownerId.toString() === userId);
    if (!isProductOwner) throw new Error(`you don't have the permission to change this product`);

    const updatingProduct = { title, desc, img, price, size, categories, color } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(productId, updatingProduct, { new: true });
    if (updatedProduct){
        res.status(200).json({
            success: {
                product: updatedProduct
            }
        })
    } else {
        res.status(400);
        throw new Error('invalid unputs');
    }
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (deletedProduct){
        res.status(200).json({
            success: {
                product: deletedProduct
            }
        })
    } else {
        res.status(400);
    }
});

exports.getProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (product){
        res.status(200).json({
            success: {
                product
            }
        })
    } else {
        res.status(400);
    }
});

exports.getAllProducts = asyncHandler(async (req, res, next) => {
    const qCategory = req.query.category;
    if (query.qCategory){
        const products = await Product.find({ categories: { $in: [qCategory] } });
    } else {
        const products = await Product.find()
    };

    res.status(200).json({  
        success: {
            products
        }
    })
    
    
})
