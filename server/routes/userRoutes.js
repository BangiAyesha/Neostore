const express = require("express");
const router = express.Router();
const {
    getData,
    postData,
    loginUser,
    getUser,
    updateData,
    sendOtpforEmail,
    sendOtpforPassword,
    verifyOtp,
    changeForgotPassword,
    changePassword,
    addAddress,
    addCart,
    socialLogin,
    loginUsingSocial,
} = require("../controller/userController");
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

router.get("/getdata", (req, res) => {
    res.send(getData());
});

router.post("/register", postData);

router.post("/register1", socialLogin);

router.post("/login1", loginUsingSocial);

router.post("/login", loginUser);

router.post("/sendotpemail", sendOtpforEmail);

router.post("/sendotppassword", sendOtpforPassword);

router.post("/verifyotp", verifyOtp);

router.post("/changeforgotpassword", changeForgotPassword);

router.put("/changepassword/:email", autenticateToken, changePassword);

router.get("/getuser/:email", autenticateToken, getUser);

router.put("/updatedata/:email", autenticateToken, updateData);

router.put("/addaddress/:email", autenticateToken, addAddress);

router.put("/addtocart/:email", addCart);

module.exports = router;
