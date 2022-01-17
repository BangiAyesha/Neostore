const Users = require("../models/userSchema");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const jwtSecret = "vdfvdsf73t7t47t574re";
const nodemailer = require("nodemailer");

// function autenticateToken(req, res, next) {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];
//     console.log(token);
//     if (token == null) {
//         res.json({ err: 1, msg: "Token not matched" });
//     } else {
//         jwt.verify(token, jwtSecret, (err, data) => {
//             if (err) {
//                 res.json({ err: 1, msg: "Token is invalid" });
//             } else {
//                 next();
//             }
//         });
//     }
// }

let checkemail;
let checkotpforregister;
let checkotpforpassword;

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "Gmail",

    auth: {
        user: "anushaneedesh@gmail.com",
        pass: "Aans@23828",
    },
});

const getData = function (req, res) {
    Users.find({}, (err, data) => {
        if (err) {
            res.json({ flag: 0, message: err.message });
        } else {
            res.json(data);
        }
    });
};

const sendOtpforEmail = function (req, res) {
    var otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
    checkotpforregister = otp;
    email = req.body.email;
    Users.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            res.send({ flag: 0, message: "User Already Registered" });
        } else {
            var mailOptions = {
                to: req.body.email,
                subject: "Otp for registration",
                html:
                    "<h3>OTP for account verification is </h3>" +
                    "<h1 style='font-weight:bold;'>" +
                    otp +
                    "</h1>",
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log("Message sent: %s", info.messageId);
                console.log(
                    "Preview URL: %s",
                    nodemailer.getTestMessageUrl(info)
                );

                res.send({ flag: 1, message: "Check email to verify" });
            });
        }
    });
};

const socialLogin = function (req, res) {
    Users.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            res.send({ message: "User Already Registered" });
        } else {
            console.log(req.body);
            let field = {
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                provider: req.body.provider,
            };
            let ins = new Users(field);
            ins.save((err) => {
                if (err) {
                    res.send({ flag: 0, message: err.message });
                } else {
                    res.send({
                        flag: 1,
                        message: "User Registered",
                    });
                }
            });
        }
    });
};

const loginUsingSocial = function (req, res) {
    console.log(req.body);
    Users.findOne({ email: req.body._profile.email }, (err, data) => {
        if (data) {
            if (req.body._provider) {
                if (data.provider == req.body._provider) {
                    let payload = {
                        oid: req.body._profile.email,
                    };
                    const token = jwt.sign(payload, jwtSecret, {
                        expiresIn: 1060000,
                    });
                    console.log(token);
                    res.json({
                        flag: 1,
                        message: "Login Success",
                        token: token,
                        user: data,
                    });
                }
            }
        } else {
            res.send({ err: 0, message: "User not registered" });
        }
    });
};

const postData = function (req, res) {
    Users.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            res.send({ message: "User Already Registered" });
        } else {
            if (req.body.otp.otp == checkotpforregister) {
                const password = req.body.values.password;
                const hashPassword = bcrypt.hashSync(password, saltRounds);
                let field = {
                    fname: req.body.values.fname,
                    lname: req.body.values.lname,
                    mobile: req.body.values.mobile,
                    email: req.body.values.email,
                    password: hashPassword,
                };
                let ins = new Users(field);
                ins.save((err) => {
                    if (err) {
                        res.send({ flag: 0, message: err });
                    } else {
                        res.send({
                            flag: 1,
                            message: "Registered Successfully!",
                        });
                    }
                });
            } else {
                res.send({ message: "Otp is incorrect" });
            }
        }
    });
};

const updateData = function (req, res) {
    console.log("email", req.params.email);
    Users.findOneAndUpdate(
        { email: req.params.email },
        { $set: req.body.values },
        (err, data) => {
            if (err) {
                res.json({ flag: 0, message: err.message });
            } else {
                res.json({ flag: 1, message: "Details Updated" });
            }
        }
    );
};

const changePassword = function (req, res) {
    console.log("change", req.params.email);
    Users.findOne({ email: req.params.email }, (err, data) => {
        if (data) {
            const oldpassword = req.body.oldpassword.oldpassword;
            const match = bcrypt.compareSync(oldpassword, data.password);
            if (match) {
                const password = req.body.values.password;
                const hashPassword = bcrypt.hashSync(password, saltRounds);
                Users.updateOne(
                    { email: data.email },
                    { $set: { password: hashPassword } },
                    (err) => {
                        if (err) {
                            res.json({ flag: 0, message: err.message });
                        } else {
                            res.json({ flag: 1, message: "Password Changed" });
                        }
                    }
                );
            } else {
                res.json({ err: 0, message: "Old Password Not Matched" });
            }
        }
    });
};

const loginUser = function (req, res) {
    Users.findOne({ email: req.body.email }, (err, data) => {
        if (data) {
            const password = req.body.password;
            const match = bcrypt.compareSync(password, data.password);
            if (match) {
                let payload = {
                    oid: req.body.email,
                };
                const token = jwt.sign(payload, jwtSecret, {
                    expiresIn: 1060000,
                });
                console.log(token);
                res.json({
                    flag: 1,
                    message: "Login Success",
                    token: token,
                    user: data,
                });
            } else {
                res.send({ flag: 0, message: "Password not matched" });
            }
        } else {
            res.send({ err: 0, message: "User not registered" });
        }
    });
};

const getUser = function (req, res) {
    console.log(req.params.email);
    Users.findOne({ email: req.params.email }, (err, data) => {
        if (err) {
            res.json({ flag: 0, message: err.message });
        } else {
            res.json(data);
        }
    });
};

const sendOtpforPassword = function (req, res) {
    var otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
    checkotpforpassword = otp;
    console.log("OTPPASS", req.body.email);
    checkemail = req.body.email;
    Users.findOne({ email: req.body.email }, (err, data) => {
        if (data) {
            var mailOptions = {
                to: req.body.email,
                subject: "Otp for Change Password",
                html:
                    "<h3>OTP for password change is </h3>" +
                    "<h1 style='font-weight:bold;'>" +
                    otp +
                    "</h1>",
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log("Message sent: %s", info.messageId);
                console.log(
                    "Preview URL: %s",
                    nodemailer.getTestMessageUrl(info)
                );

                res.send({ flag: 1, message: "Check email for OTP" });
            });
        } else {
            res.send({ flag: 0, message: "Mail id not registered" });
        }
    });
};

const verifyOtp = function (req, res) {
    console.log("VERIFY", req.body.otp);
    if (req.body.otp == checkotpforpassword) {
        res.send({ flag: 1, message: "OTP is correct" });
    } else {
        res.send({ flag: 0, message: "OTP incorrect" });
    }
};

const changeForgotPassword = function (req, res) {
    console.log("FORGOT", checkemail);
    const password = req.body.password;
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    Users.updateOne(
        { email: checkemail },
        { $set: { password: hashPassword } },
        (err) => {
            if (err) {
                res.send({ flag: 0, message: "Error!!" });
            } else {
                res.send({ flag: 1, message: "Password Updated" });
            }
        }
    );
};

const addAddress = function (req, res) {
    console.log("add", req.body);
    console.log("add", req.params.email);
    let address = {
        address: req.body.values.address,
        pincode: req.body.values.pincode,
        city: req.body.values.city,
        state: req.body.values.state,
        country: req.body.values.country,
    };
    Users.findOneAndUpdate(
        { email: req.params.email },
        { $push: { address: address } },
        (err) => {
            if (err) {
                res.json({ flag: 0, message: err.message });
            } else {
                res.json({ flag: 1, message: "Address Added" });
            }
        }
    );
};

const addCart = function (req, res) {
    console.log("cart", req.body);
    Users.updateOne(
        { email: req.params.email },
        { $set: { cart: req.body.cart } },
        (err) => {
            if (err) {
                res.json({ flag: 0, message: err.message });
            } else {
                res.json({ flag: 1, message: "Address Added" });
            }
        }
    );
};

module.exports = {
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
};
