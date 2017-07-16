const {async, await} = require('asyncawait');
const request = require('request-promise');
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect;

const app = require('../../src/app');
const config = require('../../config.json');
const bookService = require('../../src/services/book');
const rootUrl = config.server_url + ':' + config.port.test + '/book';
let runningServer, toBeUsedBookId, bookData;

describe('on root book route "/book"', () => {
  before((done) => {
    bookData = {
      title: 'lorem ipsum',
      description: 'lorem ipsum',
      author: 'mr lorem ipsum'
    }
    
    app.start(() => {
      done();
    })
  })
  
  describe('on route "/book"', () => {
    after(async(() => {
      await(bookService.removeAll());
    }));

    describe('on POST request', () => {
      describe('if request body is not valid, not pass validation', () => {
        it('will get error message, describe the validation error', async(() => {
          const notValidBookData = {
            title: 'lorem',
            author: 'mr loreng'
          };

          try {
            await(request({
              json: true,
              body: notValidBookData,
              url: rootUrl,
              method: 'POST'
            }));
          } catch(error) {
            expect(error.response.statusCode).to.equal(400);
            expect(error.response.body.error).to.deep.equal({ description: {
              param: "description",
              msg: "Description can be empty"
            }});
          }
        }));
      });

      describe('if request body is valid and pass validation', () => {
        it('can add book', async(() => {
          const response = await(request({
            json: true,
            body: bookData,
            url: rootUrl,
            method: 'POST'
          }));
          
          toBeUsedBookId = response.data._id;

          expect(response).to.shallowDeepEqual({ status: 'ok', data: bookData });
        }));
      });
    });

    describe('on GET request', () => {
      it('can get list of books', async(() => {
        const response = await(request({
          url: rootUrl,
          json: true,
          method: 'GET'
        }));
        
        expect(response).not.be.empty;
      }));
    });

    describe('on route "/book/:bookId"', () => {
      describe('with not valid book id as parameter', () => {
        const notValidBookIdErrorMessage = 'The book id you provided in url param is not valid';
        const notValidBookId = 'notvalid';

        describe('on GET request', () => {
          it('will return error message and 400 status code', async(() => {
            const url = rootUrl + '/' + notValidBookId;

            try {
              await(request({
                url: url,
                json: true,
                method: 'GET'
              }));
            } catch(error) {
              expect(error.response.statusCode).to.equal(400);
              expect(error.response.body.error).to.equal(notValidBookIdErrorMessage);
            }
          }));
        });

        describe('on PUT request', () => {
          it('will return error message and 400 status code', async(() => {
            const newBookData = {
              title: 'aku adalah anak gembala',
              description: 'dia adalah anak gembala',
              author: 'spiderman'
            }
            const url = rootUrl + '/' + notValidBookId;

            try {
              await(request({
                url: url,
                json: true,
                method: 'PUT',
                body: newBookData
              }));
            } catch(error) {
              expect(error.response.statusCode).to.equal(400);
              expect(error.response.body.error).to.equal(notValidBookIdErrorMessage);
            }
          }));
        });

        describe('on DELETE request', () => {
          it('will return error message and 400 status code', async(() => {
            const url = rootUrl + '/' + notValidBookId;
            try {
              await(request({
                url: url,
                json: true,
                method: 'DELETE'
              }));
            } catch(error) {
              expect(error.response.statusCode).to.equal(400);
              expect(error.response.body.error).to.equal(notValidBookIdErrorMessage);
            }
          }));
        });
      });

      describe('with valid book id as parameter', () => {
        describe('on GET request', () => {
          it('can retrieve book by its id', async(() => {
            const url = rootUrl + '/' + toBeUsedBookId;
            const response = await(request({
              url: url,
              json: true,
              method: 'GET'
            }));

            expect(response).to.shallowDeepEqual(bookData);
          }));
        });
        describe('on PUT request', () => {
          it('can change book data by its id', async(() => {
            const newBookData = {
              title: 'aku adalah anak gembala',
              description: 'dia adalah anak gembala',
              author: 'spiderman'
            }
            const url = rootUrl + '/' + toBeUsedBookId;
            const changeBookResponse = await(request({
              url: url,
              json: true,
              method: 'PUT',
              body: newBookData
            }));
            
            expect(changeBookResponse).to.deep.equal({ message: 'book updated'});

            const getBookResponse = await(request({
              url: url,
              json: true,
              method: 'GET'
            }));

            expect(getBookResponse).to.shallowDeepEqual(newBookData);
          }));
        });
        describe('on DELETE request', () => {
          it('can delete book by id', async(() => {
            const url = rootUrl + '/' + toBeUsedBookId;
            const deleteResponse = await(request({
              url: url,
              json: true,
              method: 'DELETE'
            }))
            expect(deleteResponse).to.deep.equal({ message: 'book deleted' });

            try {
              const getBookResponse = await(request({
                url: url,
                json: true,
                method: 'GET'
              }));
            } catch(error) {
              expect(error.response.body).to.deep.equal({ message: 'book not found' });
            }

          }));
        });
      });
    });
  });
  
  after((done) => {
    app.stop(() => {
      done();
    });
  });
});
