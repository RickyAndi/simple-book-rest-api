const Book = require('../models/Book');
const {async, await} = require('asyncawait');
const ObjectId = require('mongoose').Types.ObjectId;

const bookService =  {
  create: async((bookData) => {
    const book = new Book(bookData);
    return await(book.save());
  }),
  all: async(() => {
    return await(Book.find({}));
  }),
  removeAll: async(() => {
    return await(Book.remove({}));
  }),
  byId: async((id) => {
    bookService.throwErrorIfIdIsNotValid(id);
    return await(Book.findOne({ _id : id }));
  }),
  change: async((id, data) => {
    bookService.throwErrorIfIdIsNotValid(id);
    return await(Book.update({ _id: id}, { $set: data}, { new: false }));
  }),
  remove: async((id) => {
    bookService.throwErrorIfIdIsNotValid(id);
    return await(Book.remove({ _id: id }));
  }),
  throwErrorIfIdIsNotValid(id) {
    if (!ObjectId.isValid(id)) {
      throw new Error('you must provide valid id');
    }
  }
}

module.exports = bookService;