'use strict'

const app = require('express');
const router = app.Router();
const authService = require('../services/auth-service');

router.get('/', authService.authorize, (req, res, next) => {
    res.render('profile')
});


module.exports = router;
 