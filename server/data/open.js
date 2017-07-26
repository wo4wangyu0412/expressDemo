var mongoose = require('mongoose');
var model = require('./models');
var schema = require('./schema');

mongoose.connect('mongodb://127.0.0.1:27017/test', { useMongoClient: true });

console.log('open success');
model.create('Person', schema.people);


var db = mongoose.connection;

db.on('error', function(err) {
    console.log('dbs open err1111111111111111111');
});

db.once('success', function() {
    console.log('sdbs   open success22222222222222');
});