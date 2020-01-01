'use strict';

const http = require('http');
const app = require('../src/app');


const port = normalizePort('port', process.env.PORT || '3000');
app.set('port', port);

//Create server
const server = http.createServer(app)