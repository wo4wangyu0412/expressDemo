var mongoose = require('mongoose');
var db = mongoose.connection;
var models = {};

models.create = function(title, schemaJson) {
    var schema = new mongoose.Schema(schemaJson);

    var newModel = db.model(title, schema); // 第三个参数才是表名

    var item = new newModel({
        session: 'demo'
    });

    item.save(err => {
        if (err) {
            console.log('create ' + title + 'false' + err);
        }
        else {
            console.log('create ' + title + 'success')
        }
    });
}

module.exports = models;


