const contactSchema = require("../../validators/contact.validator");

function validateContact(req, res, next){
  const {error} = contactSchema.validate(req.body, {abortEarly: false});
  if(error){
    return res.status(400).json({
        message: 'Contact message failed!',
        details: error.details.map((d) => d.message)
    });
  }
  next();
}

module.exports = validateContact;