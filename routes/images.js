/**
 * Created by iosdev on 11.4.2017.
 */
const express = require('express')
    , router = express.Router();

// Car brands page
router.get('/brands', function(req, res) {
    res.send('1, 2, 3');
});

// Car models page
router.get('/models', function(req, res) {
    res.send('Audi Q7, BMW X5, Mercedes GL');
});

module.exports = router;