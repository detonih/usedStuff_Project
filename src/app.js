const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

//app.set('views', './views')
app.set('view engine', 'ejs');

const indexRoute = require('./routes/index-route');
const loginRoute = require('./routes/login-route');
const createAccountRoute = require('./routes/createaccount-route');
const profileRoute = require('./routes/profile-route');


app.use('/index', indexRoute);
app.use('/login', loginRoute);
app.use('/createaccount', createAccountRoute);
app.use('/profile', profileRoute);



module.exports = app;