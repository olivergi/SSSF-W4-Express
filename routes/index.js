/**
 * Created by iosdev on 11.4.2017.
 */
var express = require('express')
    , router = express.Router()

router.use('/cards', require('./cards'));
router.use('/images', require('./images'));

router.get('/home', function(req, res) {
    res.send('Home page')
});

router.get('/about', function(req, res) {
    res.send('Learn about us')
});

module.exports = router;