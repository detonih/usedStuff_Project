const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));


module.exports = app;