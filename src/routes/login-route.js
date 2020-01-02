'use strict'

const app = require('express');
const router = app.Router();
const controller = require('../controllers/login-controller');

router.get('/', (req, res, next) => {
    res.render('login')
});

router.post('/', controller.authenticate);

module.exports = router;