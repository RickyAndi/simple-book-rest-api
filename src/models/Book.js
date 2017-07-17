const mongoose = require('../Mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});

module.exports = {
  Book: mongoose.model('Book', schema),
  validation: {
    title: [
      {
        errorMessage: 'Title can be empty',
        method: 'notEmpty'
      }
    ],
    description: [
      {
        errorMessage: 'Description can be empty',
        method: 'notEmpty'
      }
    ],
    author: [
      {
        errorMessage: 'Author can be empty',
        method: 'notEmpty'
      }
    ]
  }
};