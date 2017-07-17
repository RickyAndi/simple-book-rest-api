const {async,await} = require('asyncawait');
const validate = require('../utils/validate');
const { validation } = require('../models/Book');

module.exports = [
  async((req, res, next) => {
    return await(validate(req, res, next, validation));
  })
];
