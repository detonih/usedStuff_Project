'use strict'

const app = require('express');
const router = app.Router();

router.get('/', (req, res, next) => {
    res.render('login')
});

module.exports = router;