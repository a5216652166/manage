var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('monitor', { title: 'Platform System' });
});

module.exports = router;