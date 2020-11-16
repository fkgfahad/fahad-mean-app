const Validator = require('password-validator');

const passwordSchema = new Validator();

passwordSchema
  .is()
  .min(8)
  .is()
  .max(32)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();

module.exports = passwordSchema;
