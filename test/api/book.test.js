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
  
  after((done) => {
    app.stop(() => {
      done();
    });
  });
});
