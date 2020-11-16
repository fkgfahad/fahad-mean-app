const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  verified: { type: Boolean, required: true, default: false },
  disabled: { type: Boolean, required: true, default: false },
  image: { type: String, required: false },
  password: { type: String, required: true },
  type: { type: String, required: true, default: 'client' }
});

mongoose.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
