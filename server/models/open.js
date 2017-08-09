var mongoose = require('mongoose');
var model = require('./models');
var schema = require('./schema');
mongoose.Promise = global.Promise = require('bluebird');

mongoose.connect('mongodb://127.0.0.1:27017/friend', { useMongoClient: true });

var db = mongoose.connection;

db.on('error', function(err) {
    console.log('dbs open err1111111111111111111');
});

db.once('open', function() {
    console.log('sdbs   open success22222222222222');
});

model.create('people', schema.people, 'people');
model.create('visitor', schema.visitor, 'visitor');
