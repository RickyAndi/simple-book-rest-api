const {async,await} = require('asyncawait');
const getError = require('../utils/getError');

module.exports = [
  async((req, res, next) => {
    req.checkBody('title', 'Title can be empty').notEmpty();
    req.checkBody('description', 'Description can be empty').notEmpty();
    req.checkBody('author', 'Author can be empty').notEmpty();

    try {
      const validationResult = await(req.getValidationResult());
      
      if (!validationResult.isEmpty()) {
        return next({ status: 400, message: validationResult.mapped() });
      }

      return next();
    } catch(error) {

    }
  })
];