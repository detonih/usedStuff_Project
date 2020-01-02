'use strict'

const app = require('express');
const router = app.Router();
const controller = require('../controllers/createaccount-controller');

router.get('/', (req, res, next) => {
    res.render('createaccount')
});

router.get('/users', controller.get);
router.post('/', controller.post);
//router.put('/', controller.put);

module.exports = router;