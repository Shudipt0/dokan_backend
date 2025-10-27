const express = require("express");
const {
  getAllProducts,
  addProduct,
  getSingleProductById,
  searchProducts,
  getCategoryList,
  getProductsByCategory,
  getAllCategories,
  deleteProduct,
  updateProduct,
  postReviews,
} = require("../controllers/product.controller");
const imageUpload = require("../middlewares/products/product.imageUpload");
const validateProduct = require("../middlewares/products/product.validate");
const uploader = require("../utilities/product.singleUploader");


const router = express.Router();

// add product
router.post("/", imageUpload, validateProduct, addProduct);

// get all products
router.get("/", getAllProducts);

// get search products
router.get("/search", searchProducts);

// get all categories
router.get("/categories", getAllCategories);

// get category-list
router.get("/category-list", getCategoryList);

// get products by category
router.get("/category/:slug", getProductsByCategory);

// get single product by id
router.get("/:id", getSingleProductById);

// post reviews
router.post("/:id/reviews", uploader().none(), postReviews);

// update single product by id
router.put("/:id", imageUpload, updateProduct);

// delete product by id
router.delete("/:id", deleteProduct);

module.exports = router;
