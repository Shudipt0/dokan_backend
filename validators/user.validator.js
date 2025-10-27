const Joi = require("joi");

// user registered schema
const userSchema = Joi.object({
  name: Joi.string().required().trim().min(1).max(10).messages({
    "string.empty": "Name is required!",
    "string.min": "Name must be at least 1 character long.",
    "string.max": "Name cannot be longer than 10 characters.",
  }),
  email: Joi.string().email().required().trim().messages({"string.empty": "Email is required!"}),
  password: Joi.string()
    .required()
    .trim()
    .min(4)
    .max(16)
    .messages({
      "string.empty": "password is required!",
      "string.min": "password must be at least 4 character long.",
      "string.max": "password cannot be longer than 16 characters.",
    }),
  role: Joi.string().valid("user", "admin").default("user"),
});

module.exports = userSchema;
