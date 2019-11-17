const mongoose = require("mongoose");
const schema = mongoose.Schema({
    created_at: Date,
    customer: String,
    action: String,
    data: Object,
});
schema.pre("save", function (next) {
    console.log("new");
    if (this.isNew) {
        this.created_at = new Date();
    }

    next();
});

module.exports = mongoose.model("Event", schema);
