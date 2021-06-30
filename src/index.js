const express = require('express');
const serverless = require('serverless-http');
const server = express();
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const shortUrlController = require('./controllers/shortUrl');

const spec = YAML.load('./swagger.yml')

server.use('/docs', swaggerUI.serve, swaggerUI.setup(spec));

server.use(express.json());

server.get('/', shortUrlController.index);

server.get('/index/:filterDate?', shortUrlController.index);

server.get('/store', shortUrlController.store); // CHANGE FOR POST

server.get('/show/:id', shortUrlController.show);

server.get('/getbycode/:code', shortUrlController.getByCode);

module.exports = server;