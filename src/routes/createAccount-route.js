const app = require('express');
const router = app.Router();

router.get('/', (req, res, next) => {
    res.render('createaccount')
});

module.exports = router;