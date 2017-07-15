const router = require('express').Router();
const bookController = require('../controllers/book');

router.get('/', bookController.index);
router.post('/', bookController.createBook);
router.get('/:bookId', bookController.getBookById);
router.put('/:bookId', bookController.changeBookById);
router.delete('/:bookId', bookController.removeBookById);

module.exports = router;