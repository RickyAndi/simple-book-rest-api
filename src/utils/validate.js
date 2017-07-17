const {async, await} = require('asyncawait'); 
const getError = require('./getError');

module.exports = async((req, res, next, validation) => {
  Object.keys(validation).forEach((modelField) => {
    validation[modelField].forEach((validationRule) => {
      req.checkBody(modelField, validationRule.errorMessage)[validationRule.method]();
    });
  });
  
  try {
    const validationResult = await(req.getValidationResult());
    
    if (!validationResult.isEmpty()) {
      return next(getError({ status: 400, message: validationResult.mapped() }));
    }

    return next();
  } catch(error) {
    return next(getError({ status: 500, message: error.message }));
  }
});
