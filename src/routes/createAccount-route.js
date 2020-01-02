'use strict'

const app = require('express');
const router = app.Router();
const controller = require('../controllers/createAccount-controller');

router.get('/', (req, res, next) => {
    res.render('createaccount')
});

router.post('/', controller.post);

module.exports = router;