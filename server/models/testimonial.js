const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

const testimonialSchema = mongoose.Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  speech: { type: String, required: true },
  show: { type: Boolean, required: true }
});

mongoose.plugin(paginate);

module.exports = mongoose.model('Testimonial', testimonialSchema);
