const mongoose = require("mongoose");
module.exports = mongoose.model("Bid", {
    _id: String,
    created_at: Date,
    updated_at: Date,
    product: String,
    bid_step: Number,
    highest_bid: Number,
    customer: String,
    status: {
        enum: ['active','inactive', 'closed'],
        type: String,
        default: 'inactive'
    },
});
