const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        cart: { type: Array, required: true },
        address: { type: String, required: true },
        cardno: { type: Number, required: true },
        total: { type: Number, required: true },
        gst: { type: Number, required: true },
        subtotal: { type: Number, required: true },
        email: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Orders", orderSchema);
