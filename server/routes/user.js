var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json({limit: '50mb'});
var mongoose = require('mongoose');
var personModel = mongoose.model('Person');

var mongoose = require('mongoose');
var db = mongoose.connection;

router.get('/user/add', (req, res) => res.render('user/add'));

router.post('/add/info', jsonParser, (req, res) => {
    if (req.body) {
        var one = new personModel(req.body);

        one.save(err => {
            if (err) {
                console.log(' add error');
            }
            else {
                personModel.find({}, (err, result) => {
                    // if (err) return handleError(err);

                    res.send(result);
                });
            }
        });

    }
});

router.get('/user/list', (req, res) => {
    personModel.find({}, (err, result) => {
        if (err) return handleError(err);

        // res.send(result);
        res.render('user/list', {result})
    });
});

router.post('/user/delete', jsonParser, (req, res) => {
    let id = req.body.id;

    if (id) personModel.findByIdAndRemove(id, err => {
        if (err) {
            res.send('delete error');
        }
        else {
            res.send('delete success');
        }
    });
});

module.exports = router;