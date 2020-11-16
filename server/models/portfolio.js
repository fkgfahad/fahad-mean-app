const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

const portfolioSchema = mongoose.Schema({
  date: { type: Date, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  skills: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true }
  ],
  detail: { type: String, required: true },
  link: { type: String, required: false },
  sourceCode: { type: String, required: false },
  publish: { type: Boolean, required: true, default: false },
  images: [{ type: String, required: false }]
});

mongoose.plugin(paginate);

module.exports = mongoose.model('Portfolio', portfolioSchema);
