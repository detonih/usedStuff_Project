'use strict';

const http = require('http');
const app = require('../src/app');
const debug = require('debug');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//Create server
const server = http.createServer(app);
server.listen(port);

server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error) { //quando recebemos um erro
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch (error.code) { //pegamos o error code (EACCESS, EADDRINUSE) e printa a tela 
        case 'EACCES': 
            console.error(bind + ' require relevant privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE': //endereço em uso
            console.error(bind + ' is already in use'); 
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address(); //pega as infos do servidor
    const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr;
    debug('Listening on ' + bind); //starta o debug
}