var mongoose = require('mongoose');
var db = mongoose.connection;
var model = {};

model.create = function(title, schema) {
    var PersonSchema = new mongoose.Schema(schema);

    var PersonModel = db.model(title, PersonSchema);
}

module.exports = model;


