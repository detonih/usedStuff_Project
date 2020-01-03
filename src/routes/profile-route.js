'use strict'

const app = require('express');
const router = app.Router();
const controller = require('../controllers/login-controller');
const authService = require('../services/auth-service');

router.get('/', authService.isUser, controller.authenticate, (req, res, next) => {
    res.render('profile')
});

//router.post('/login', controller.authenticate);

module.exports = router;
 