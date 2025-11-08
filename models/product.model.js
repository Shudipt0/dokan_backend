const mongoose = require("mongoose");

// review schema
const reviewSchema = mongoose.Schema({
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now },
  reviewerName: String,
  reviewerEmail: String,
});

// meta schema
const metaSchema = mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  barcode: String,
  qrcode: String,
});

// product schema
const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
    },
    stock: {
      type: Number,
    },
    tags: [{ type: String }],
    brand: {
      type: String,
    },
    weight: { type: String },
    warrantyInformation: {
      type: String,
    },
    shippingInformation: {
      type: String,
    },
    availableStatus: {
      type: String,
      enum: ["in stock", "low stock", "out of stock"],
      default: "in stock",
    },
      productAge: {
      type: String,
      enum: ["new", "old"],
      default: "new",
    },
    reviews: [reviewSchema],
    returnPolicy: { type: String },
    minimumOrderQuantity: { type: Number },
    meta: metaSchema,
    thumbnail: { url: { type: String }, public_id: { type: String } },
    images: [{ url: { type: String }, public_id: { type: String } }],
  },
  { timestamps: true } // add createdAt and updatedAt automatically
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
