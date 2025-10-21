const Product = require("../models/product.model");

// add products
async function addProduct(req, res, next) {
  const product = req.body;
  try {
    const newProduct = await Product.create(product);
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// get all products
async function getAllProducts(req, res, next) {
  const page = req.query?.page || 1;
  const limit = req.query?.limit;
  const dataskip = req.query?.skip || (page - 1) * limit;
  const sortBy = req.query?.sortBy || "price";
  const sortOrder = req.query?.sortOrder || "asc";
  const totalProducts = await Product.countDocuments();
  try {
    const products = await Product.find({})
      .limit(limit)
      .skip(dataskip)
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 }); // sort by price ascending
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: products,
      total: totalProducts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// get search products
async function searchProducts(req, res, next) {
  const { q } = req.query;
  try {
    const products = await Product.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { brand: { $regex: q, $options: "i" } },
      ],
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// get all categories
async function getAllCategories(req, res, next) {
  try {
    const categories = await Product.distinct("category");
    const formattedCategories = categories.map((category) => ({
      slug: category.toLowerCase(),
      name: category.charAt(0).toUpperCase() + category.slice(1),
      url: `http://localhost:5000/api/v1/products/category/${category.toLowerCase()}`,
    }));
    res.status(200).json(formattedCategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// get category-list
async function getCategoryList(req, res, next) {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// get products by category
async function getProductsByCategory(req, res, next) {
  const { slug } = req.params;
  const totalProducts = await Product.countDocuments();
  try {
    const products = await Product.find({ category: slug });
    res.status(200).json({
      success: true,
      products: products,
      total: totalProducts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// get single product by id
async function getSingleProductById(req, res, next) {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// post reviews
async function postReviews(req, res, next) {
  const { id } = req.params;
  const { rating, comment, reviewerName, reviewerEmail } = req.body;
  try{
    const product = await Product.findById(id);
    if(!product){
      return res.status(404).json({ message: "Product not found" });
    };

    const newReview = {
      rating, comment, reviewerName, reviewerEmail, date: new Date(),
    }
    product.reviews.push(newReview);
    await product.save();
    res.status(200).json({ message: "Review added successfully!" });

  } catch (err){
    res.status(500).json({ message: err.message });
  }
}

// update product by id
async function updateProduct(req, res, next) {
  const {id} = req.params;
  const updates = req.body;
  try{
    await Product.findByIdAndUpdate(id, { $set: updates }, { new: true });
    res.status(200).json({ message: "Product updated successfully!" });
  }catch (err){
    res.status(500).json({ message: err.message });
  }

}

// delete product by id
async function deleteProduct(req, res, next) {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  addProduct,
  getAllProducts,
  getSingleProductById,
  searchProducts,
  getCategoryList,
  getProductsByCategory,
  getAllCategories,
  deleteProduct,
  updateProduct,
  postReviews,
};
