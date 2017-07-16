const router = require('express').Router();
const bookController = require('../controllers/book');

router.route('/')
  .get(bookController.index)
  .post(bookController.createBook);

router.route('/:bookId')
  .get(bookController.getBookById)
  .put(bookController.changeBookById)
  .delete(bookController.removeBookById);

module.exports = router;