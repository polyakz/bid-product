const mongoose = require("mongoose");
module.exports = mongoose.model("Bid", {
    created_at: Date,
    updated_at: Date,
    product: String,
    original_price: Number,
    bid_step: Number,
    highest_bid: Number,
    customer: String,
    status: {
        enum: ['active','inactive', 'closed'],
        type: String,
        default: 'inactive'
    },
});


