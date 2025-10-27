const orderSchema = require("../../validators/order.validator");


function validateOrder(req, res, next){
  const {error} = orderSchema.validate(req.body, {abortEarly: false});
  if(error){
    return res.status(400).json({
        message: 'Validation failed!',
        details: error.details.map((d) => d.message)
    });
  }
  next();
}

module.exports = validateOrder;