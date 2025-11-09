const Joi = require('joi');

// review schema
const reviewSchema = Joi.object({
  rating: Joi.number().min(0).max(5),
  comment: Joi.string().allow("", null),
  date: Joi.date(),
  reviewerName: Joi.string().trim(),
  reviewerEmail: Joi.string().email(),
});

// meta schema
const metaSchema = Joi.object({
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
  barcode: Joi.string(),
  qrcode: Joi.string(),
});

const imageSchema = Joi.object({
    url: Joi.string().uri().allow("", null),
    public_id: Joi.string().allow("", null),
})

// product schema
const productSchema = Joi.object(
  {
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    rating: Joi.number().optional().allow("", null),
    stock: Joi.number().optional().allow("", null),
    tags: Joi.array().items(Joi.string().allow("", null)).optional().allow("", null),
    brand: Joi.string().optional().allow("", null),
    weight: Joi.string().optional().allow("", null),
    warrantyInformation: Joi.string().optional().allow("", null),
    shippingInformation: Joi.string().optional().allow("", null),
    availableStatus: Joi.string().valid('in stock', 'low stock', 'out of stock').empty("").default('in stock'),
    productAge: Joi.string().valid('new', 'old').empty("").default('new'),
    reviews: Joi.array().items(reviewSchema).optional().allow("", null),
    returnPolicy: Joi.string().allow("", null),
    minimumOrderQuantity: Joi.number().integer().optional().allow("", null),
    meta: metaSchema,
    thumbnail: imageSchema,
    images: Joi.array().items(imageSchema).optional().allow("", null),
  }
  
);

module.exports = productSchema;