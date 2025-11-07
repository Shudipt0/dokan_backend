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
    url: Joi.string().uri(),
    public_id: Joi.string(),
})

// product schema
const productSchema = Joi.object(
  {
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    rating: Joi.number(),
    stock: Joi.number(),
    tags: Joi.array().items(Joi.string()),
    brand: Joi.string(),
    weight: Joi.string(),
    warrantyInformation: Joi.string(),
    shippingInformation: Joi.string(),
    availableStatus: Joi.string().valid('in stock', 'low Stock', 'out of stock').default('in stock'),
    productAge: Joi.string().valid('new', 'old').default('new'),
    reviews: Joi.array().items(reviewSchema),
    returnPolicy: Joi.string(),
    minimumOrderQuantity: Joi.number().integer(),
    meta: metaSchema,
    thumbnail: imageSchema,
    images: Joi.array().items(imageSchema),
  }
  
);

module.exports = productSchema;