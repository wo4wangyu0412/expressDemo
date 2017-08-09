var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var model = require('../../server/models/models');
var peopleModel = db.model('people');

var mongoose = require('mongoose');
var db = mongoose.connection;

router.get('/add', function(req, res) {
    // res.send(db.model('Person'));
    res.render('add');
});

router.post('/add/info', jsonParser, function(req, res) {
    if (req.body) {
        new peopleModel(req.body);

        res.send(db.model('people'));
    }
});

module.exports = router;