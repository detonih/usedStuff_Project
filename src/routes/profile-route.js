'use strict'

const app = require('express');
const router = app.Router();
const authService = require('../services/auth-service');
const controller = require('../controllers/profile-controller');
const controllerLogin = require('../controllers/login-controller');

router.get('/', authService.authorize, (req, res, next) => {
    res.render('profile')
});

router.get('/user', controller.get);
router.post('/', controllerLogin.authenticate);

module.exports = router;
 