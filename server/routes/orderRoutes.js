const express = require("express");
const router = express.Router();
const {
    addOrder,
    getOrders,
    getInvoicedetails,
} = require("../controller/orderController");
const jwt = require("jsonwebtoken");
const jwtSecret = "vdfvdsf73t7t47t574re";

function autenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
    if (token == null) {
        res.json({ err: 1, msg: "Token not matched" });
    } else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ err: 1, msg: "Token is invalid" });
            } else {
                next();
            }
        });
    }
}

router.post("/addorder", autenticateToken, addOrder);

router.get("/getorders/:email", autenticateToken, getOrders);

router.get("/getinvoicedetails/:id", getInvoicedetails);

module.exports = router;
