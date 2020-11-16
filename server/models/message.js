const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  seen: { type: Boolean, required: true }
});

module.exports = mongoose.model('Message', messageSchema);
