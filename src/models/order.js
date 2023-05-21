const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User',
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'Product',
    },
    productId:{
        type: mongoose
    },
    items:[
        {
            item:{
                id:{
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                
                },
                date:{
                    type: Date,
                    required: true,
                    default: Date.now,
                },
            },
        },
    ],
    });

    const Order = mongoose.model("Order", orderSchema);

    exports.Order = Order;