const productSchema = require('../../validators/product.validator');

function validateProduct(req, res, next){
  const {error} = productSchema.validate(req.body, {abortEarly: false});
  if(error){
    return res.status(400).json({
        message: 'Validation failed!',
        details: error.details.map((d) => d.message)
    });
  }
  next();
}

module.exports = validateProduct;