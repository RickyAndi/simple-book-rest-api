const mongoose = require('../Mongoose');

const schema = new mongoose.Schema({
  title: String,
  description: String,
  author: String
});

module.exports = mongoose.model('Book', schema);