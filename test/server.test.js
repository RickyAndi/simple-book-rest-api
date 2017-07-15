const {expect} = require('chai');
const server = require('../src/server');
const request = require('request-promise');
const config = require('../config.json');
const {async, await} = require('asyncawait');
const rootServerUrl = config.server_url + ':' + config.port.test + '/';
let runningServer;

describe('server', () => {
  before((done) => {
    runningServer = server.listen(config.port.test, () => {
      done();
    });
  })

  describe('on route "/"', () => {
    describe('GET request', () => {
      it('will get json "{ message: "hello world" }"', async(() => {
        const response = JSON.parse(await(request.get(rootServerUrl)));
        expect(response).to.deep.equal({ message: 'hello world'});
      }));
    });
  });

  describe('on route "/book"', () => {
    
  });
  
  after((done) => {
    runningServer.close();
    done();
  });
});
