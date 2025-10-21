const express = require('express');
const { getAllProducts, addProduct, getSingleProductById, searchProducts, getCategoryList, getProductsByCategory, getAllCategories, deleteProduct, updateProduct } = require('../controllers/product.controller');


const router = express.Router();

// add product
router.post('/', addProduct);

// get all products
router.get('/', getAllProducts);

// get search products
router.get('/search', searchProducts);

// get all categories
router.get('/categories', getAllCategories);

// get category-list
router.get('/category-list', getCategoryList);

// get products by category
router.get('/category/:slug', getProductsByCategory)

// get single product by id
router.get('/:id', getSingleProductById);

// update single product by id
router.put('/:id', updateProduct);

// delete product by id
router.delete('/:id', deleteProduct);








module.exports = router;