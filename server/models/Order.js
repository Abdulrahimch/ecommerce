const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    ownerId: {
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

    ],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }

},
{
    timestamps: true
});

module.exports = Order = mongoose.model("Order", OrderSchema);