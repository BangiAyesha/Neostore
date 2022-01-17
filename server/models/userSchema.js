const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
    {
        fname: { type: String },
        lname: { type: String },
        email: { type: String, unique: true },
        password: { type: String },
        mobile: { type: Number },
        address: { type: Array },
        cart: { type: Array },
        provider: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Users", userModel);
