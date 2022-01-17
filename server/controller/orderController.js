const Orders = require("../models/orderSchema");

const addOrder = function (req, res) {
    console.log(req.body);
    let data = {
        cart: req.body.cart1,
        address: req.body.selected,
        cardno: req.body.values.card,
        total: req.body.total,
        gst: req.body.gst,
        subtotal: req.body.subtotal,
        email: req.body.email,
    };
    let ins = new Orders(data);
    ins.save((err) => {
        if (err) {
            res.json({ flag: 0, message: err.message });
        } else {
            res.json({ flag: 1, message: "Order Added" });
        }
    });
};

const getOrders = function (req, res) {
    Orders.find({ email: req.params.email }, (err, data) => {
        if (err) {
            res.json({ flag: 0, message: err.message });
        } else {
            res.json(data);
        }
    });
};

const getInvoicedetails = function (req, res) {
    Orders.findById(req.params.id, (err, data) => {
        if (err) {
            res.json({ flag: 0, message: err.message });
        } else {
            res.json(data);
        }
    });
};

module.exports = { addOrder, getOrders, getInvoicedetails };
