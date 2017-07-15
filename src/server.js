const express = require('express');
const server = express();
const bodyParser = require('body-parser');

const bookRoutes = require('./routes/book');

server.use(bodyParser.json());

server.use('/book', bookRoutes);

server.get('/', require('./controllers/index').hello);

module.exports = server;