const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    products: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }

    ]
},
{
    timestamps: true
});

module.exports = Cart = mongoose.model("Cart", CartSchema);
