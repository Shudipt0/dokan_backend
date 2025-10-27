const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    company_name: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    address_details: {
      type: String,
      trim: true,
    },
    city_town: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    ordered_product: {
      type: String,
      required: true,
      trim: true,
    },
    coupon: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirm", "deliveried"],
      default: "pending",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
