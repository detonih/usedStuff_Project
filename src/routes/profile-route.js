'use strict';

const app = require('express');
const router = app.Router();
const controller = require('../controllers/profile-controller');

/* router.get('/', (req, res, next) => {
    res.render('profile')
}); */

router.get('/:id', controller.getById);


module.exports = router;