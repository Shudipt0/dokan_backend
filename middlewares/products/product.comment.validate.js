const { reviewSchema } = require("../../validators/product.validator");


function validateComment(req, res, next){
  const {error} = reviewSchema.validate(req.body, {abortEarly: false});
  if(error){
    return res.status(400).json({
        message: 'Validation failed!',
        details: error.details.map((d) => d.message)
    });
  }
  next();
}

module.exports = validateComment;