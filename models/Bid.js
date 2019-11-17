const mongoose = require("mongoose");
const schema = mongoose.Schema({
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
schema.pre("save", true, function (next) {
    if (this.isNew) {
        this.created_at = new Date();
    }

    this.updated_at = new Date();
    next();
});
module.exports = mongoose.model("Bid", schema);
