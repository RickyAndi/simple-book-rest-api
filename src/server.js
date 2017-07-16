const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const bookRoutes = require('./routes/book');

server.use(expressValidator());
server.use(bodyParser.json());
server.use('/book', bookRoutes);
server.get('/', require('./controllers/index').hello);

server.use((err, req, res, next) => {
  let errorMessage;

  try {
    errorMessage = JSON.parse(err.message);
  } catch(error) {
    errorMessage = err.message;
  }
  
  return res
    .status(err.status)
    .json({
      error: errorMessage
    });
});

module.exports = server;