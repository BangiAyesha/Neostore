const express = require("express");
const router = express.Router();
const {
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
} = require("../controller/productController");

router.post("/addproduct", addProduct);

router.post("/addcolor", addColor);

router.post("/addcategory", addCategory);

router.get("/getproducts", getProduct);

router.get("/getproductdetails/:id", getProductDetails);

router.get("/getcolor", getColor);

router.get("/getcolor/:id", getColorDetails);

router.get("/getcategories", getCategories);

router.get("/sortrating", sortRating);

router.get("/sortpriceasc", sortPriceAsc);

router.get("/sortpricedesc", sortPriceDesc);

module.exports = router;
