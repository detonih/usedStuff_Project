const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

const indexRoute = require('./routes/index-route');

app.get('/', indexRoute);

module.exports = app;