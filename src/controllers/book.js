const {async, await} = require('asyncawait');
const bookService = require('../services/book');
const getError = require('../utils/getError');

module.exports =  {
  createBook: async((req, res, next) => {
    try {
      const bookData = req.body;
      const newBook = await(bookService.create(bookData));
      return res
        .status(201)
        .json({
          status: 'ok',
          data: newBook
        });
    } catch(error) {
      next(getError(error));
    }
  }),
  index: async((req, res, next) => {
    try {
      const books = await(bookService.all());
      return res
        .status(200)
        .json(books);
    } catch(error) {
      next(getError(error));
    }
  }),
  getBookById: async((req, res, next) => {
    try {
      const bookId = req.params.bookId;
      const book = await(bookService.byId(bookId));
      
      if (book === null) {
        next(getError({ status: 404, message: 'book not found' }));
      }

      return res
        .status(200)
        .json(book);

    } catch(error) {
      next(getError(error));
    }
  }),
  changeBookById: async((req, res, next) => {
    try {
      const bookId = req.params.bookId;
      const bookData = req.body;
      const book = await(bookService.change(bookId, bookData));

      if (book === null) {
        next(getError({ status: 404, message: 'book not found' }));
      }

      return res
        .status(200)
        .json({
          message: 'book updated'
        });

    } catch(error) {
      next(getError(error));
    }
  }),
  removeBookById: async((req, res, next) => {
    try {
      const bookId = req.params.bookId;
      await(bookService.remove(bookId));
      
      return res
        .status(200)
        .json({
          message: 'book deleted'
        });

    } catch(error) {
      next(getError(error));
    }
  })
}
