/**
 * Created by iosdev on 11.4.2017.
 */
const express = require('express')
    , router = express.Router();

// Car brands page
router.get('/cards', function(req, res) {
    res.send('Audi, BMW, Mercedes')
});

// Car models page
router.get('/models', function(req, res) {
    res.send('Audi Q7, BMW X5, Mercedes GL')
});

module.exports = router;