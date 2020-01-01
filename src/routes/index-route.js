const app = require('express');
const router = app.Router();

router.get('/', (req, res) => {
    res.status(200).send('hello')
});

module.exports = router;