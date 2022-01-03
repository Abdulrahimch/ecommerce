const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: { 
        type: String 
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    categories: Array,
    size: String,
    color: String,
    ownerId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},
{
    timestamps: true
});

module.exports = Product = mongoose.model("Product", ProductSchema);
