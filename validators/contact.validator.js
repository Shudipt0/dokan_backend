const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required().trim().min(3).max(12).messages({
    "string.empty": "Name is required!",
    "string.min": "Name must be at least 3 character long.",
    "string.max": "Name cannot be longer than 10 characters.",
  }),
  email: Joi.string().trim(),
  phone: Joi.string().required().trim().min(10).max(12).messages({
    "string.empty": "Phone is required!",
    "string.min": "Phone must be at least 11 character long.",
    "string.max": "Phone cannot be longer than 11 characters.",
  }),
  message: Joi.string().required().trim().min(10).max(50).messages({
    "string.empty": "Phone is required!",
    "string.min": "Phone must be at least 11 character long.",
    "string.max": "Phone cannot be longer than 11 characters.",
  }),
});

module.exports = contactSchema;
