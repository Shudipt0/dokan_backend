const Joi = require("joi");

const orderSchema = Joi.object({
  name: Joi.string().required().trim().min(3).max(10).messages({
    "string.empty": "Name is required!",
    "string.min": "Name must be at least 3 character long.",
    "string.max": "Name cannot be longer than 10 characters.",
  }),
  company_name: Joi.string().trim().optional().allow("", null),
  address: Joi.string().required().trim().min(5).max(20).messages({
    "string.empty": "Name is required!",
    "string.min": "Address must be at least 5 character long.",
    "string.max": "Address cannot be longer than 20 characters.",
  }),
  address_details: Joi.string().trim().optional().allow("", null),
  city_town: Joi.string().required().trim().min(3).max(20).messages({
    "string.empty": "City/Town is required!",
    "string.min": "City/Town must be at least 3 character long.",
    "string.max": "City/Town cannot be longer than 20 characters.",
  }),
  phone: Joi.string().required().trim().min(11).max(11).messages({
    "string.empty": "Phone is required!",
    "string.min": "Phone must be at least 11 character long.",
    "string.max": "Phone cannot be longer than 11 characters.",
  }),
  email: Joi.string().required().trim().messages({
    "string.empty": "Email is required!",
  }),
  ordered_product: Joi.array().items(Joi.string()).required().messages({
    "string.empty": "ordered_product is required!",
  }),
  coupon: Joi.string().trim().optional().allow("", null),
  status: Joi.string()
    .valid("pending", "confirm", "deliveried")
    .default("pending"),
});

module.exports = orderSchema;
