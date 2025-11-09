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
    rating: Joi.number().allow("", null),
    stock: Joi.number().allow("", null),
    tags: Joi.array().items(Joi.string().allow("", null)).allow("", null),
    brand: Joi.string().allow("", null),
    weight: Joi.string().allow("", null),
    warrantyInformation: Joi.string().allow("", null),
    shippingInformation: Joi.string().allow("", null),
    availableStatus: Joi.string().valid('in stock', 'low Stock', 'out of stock').default('in stock').allow("", null),
    productAge: Joi.string().valid('new', 'old').default('new').allow("", null),
    reviews: Joi.array().items(reviewSchema).allow("", null),
    returnPolicy: Joi.string().allow("", null),
    minimumOrderQuantity: Joi.number().integer().allow("", null),
    meta: metaSchema,
    thumbnail: imageSchema,
    images: Joi.array().items(imageSchema).allow("", null),
  }
  
);

module.exports = productSchema;