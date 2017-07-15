const {async, await} = require('asyncawait');
const bookService = require('../services/book');

module.exports =  {
  createBook: async((req, res) => {
    try {
      const bookData = req.body;
      const newBook = await(bookService.create(bookData));
      return res
        .status(200)
        .json({
          status: 'ok',
          data: newBook
        });
    } catch(error) {
      return res
        .status(500)
        .json({
          error: error.message
        })
    }
  }),
  index: async((req, res) => {
    try {
      const books = await(bookService.all());
      return res
        .status(200)
        .json(books);
    } catch(error) {
      return res
        .status(500)
        .json({
          error: error.message
        })
    }
  }),
  getBookById: async((req, res) => {
    try {
      const bookId = req.params.bookId;
      const book = await(bookService.byId(bookId));
      
      if (book === null) {
        return res
          .status(404)
          .json({
            message: 'book not found'
          });
      }

      return res
        .status(200)
        .json(book);

    } catch(error) {
      return res
        .status(500)
        .json({
          error: error.message
        });
    }
  }),
  changeBookById: async((req, res) => {
    try {
      const bookId = req.params.bookId;
      const bookData = req.body;
      const book = await(bookService.change(bookId, bookData));

      if (book === null) {
        return res
          .status(404)
          .json({
            message: 'book not found'
          });
      }

      return res
        .status(200)
        .json({
          message: 'book updated'
        });

    } catch(error) {

      return res
        .status(500)
        .json({
          error: error.message
        });
    }
  }),
  removeBookById: async((req, res) => {
    try {
      const bookId = req.params.bookId;
      await(bookService.remove(bookId));
      
      return res
        .status(200)
        .json({
          message: 'book deleted'
        });

    } catch(error) {

      return res
        .status(500)
        .json({
          error: error.message
        });
    }
  })
}
