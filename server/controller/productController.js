const Products = require("../models/productSchema");
const Colors = require("../models/colorSchema");
const Categories = require("../models/categorySchema");

const addProduct = function (req, res) {
    let ins = new Products(req.body);
    ins.save((err) => {
        if (err) {
            res.json({ flag: 0, message: err.message });
        } else {
            res.json({ flag: 1, message: "Product Added" });
        }
    });
};

const addColor = function (req, res) {
    let ins = new Colors(req.body);
    ins.save((err) => {
        if (err) {
            res.json({ flag: 0, message: err.message });
        } else {
            res.json({ flag: 1, message: "Color Added" });
        }
    });
};

const addCategory = function (req, res) {
    let ins = new Categories(req.body);
    ins.save((err) => {
        if (err) {
            res.json({ flag: 0, message: err.message });
        } else {
            res.json({ flag: 1, message: "Category Added" });
        }
    });
};

const getProduct = function (req, res) {
    Products.find({}, (err, data) => {
        if (err) {
            res.json({ flag: 0, message: err.message });
        } else {
            res.json(data);
        }
    });
};

const getProductDetails = function (req, res) {
    Products.findById(req.params.id, (err, data) => {
        if (err) {
            res.json({ flag: 0, message: err.message });
        } else {
            res.json(data);
        }
    });
};

const getColor = function (req, res) {
    Colors.find({}, (err, data) => {
        if (err) {
            res.json({ flag: 0, message: err.message });
        } else {
            res.json(data);
        }
    });
};

const getColorDetails = function (req, res) {
    Colors.findById(req.params.id, (err, data) => {
        if (err) {
            res.json({ flag: 0, message: err.message });
        } else {
            res.json(data);
        }
    });
};

const getCategories = function (req, res) {
    Categories.find({}, (err, data) => {
        if (err) {
            res.json({ flag: 0, message: err.message });
        } else {
            res.json(data);
        }
    });
};

const sortRating = function (req, res) {
    Products.find({}, (err, data) => {
        if (err) {
            res.json({ flag: 0, message: err.message });
        } else {
            res.json(data);
        }
    })
        .sort({ product_rating: -1 })
        .exec();
};

const sortPriceAsc = function (req, res) {
    Products.find({}, (err, data) => {
        if (err) {
            res.json({ flag: 0, message: err.message });
        } else {
            res.json(data);
        }
    })
        .sort({ product_cost: 1 })
        .exec();
};

const sortPriceDesc = function (req, res) {
    Products.find({}, (err, data) => {
        if (err) {
            res.json({ flag: 0, message: err.message });
        } else {
            res.json(data);
        }
    })
        .sort({ product_cost: -1 })
        .exec();
};

module.exports = {
    addProduct,
    addColor,
    addCategory,
    getProduct,
    getProductDetails,
    getColor,
    getColorDetails,
    getCategories,
    sortRating,
    sortPriceAsc,
    sortPriceDesc,
};
