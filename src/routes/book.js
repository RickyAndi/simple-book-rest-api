const router = require('express').Router();
const bookController = require('../controllers/book');

const addBookMiddleware = require('../middlewares/addBookMiddleware');

router.route('/')
  .get(bookController.index)
  .post(addBookMiddleware, bookController.createBook);

router.route('/:bookId')
  .get(bookController.getBookById)
  .put(bookController.changeBookById)
  .delete(bookController.removeBookById);

module.exports = router;