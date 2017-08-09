var mongoose = require('mongoose');
var util = require('../util/util');
var db = mongoose.connection;
var model = {};
var personModel = mongoose.model('people');
var visitorModel = mongoose.model('visitor');


/**
 * 绑定会员微信号
 *
 * @param  {[type]}   data [description]
 * @param  {Function} fn   [description]
 * @param  {[type]}   res  [description]
 * @return {[type]}        [description]
 */
model.checkByCode = function(data, fn, res) {

    visitorModel.find({'session_key': data.token}, (err, result) => {
        if (err) {
            res.send({ error: err});
        }

        if (result.length > 1 || result[0].isVip) {
            // res.statusCode = 1001;
            res.send({
                code: 10001,
                msg: '您已经绑定过嘉宾'
            });
        }

        personModel.update({cardNum: data.code}, {
            $set: {
                openid: result[0].openid
            },
            multi: true
        }, (err) => {
            if (err) {
                res.statusCode = 400;
                res.send({ error: err});
                return;
            }

            result[0].isVip = true;

            let updateVisitor = new visitorModel(result[0]);

            updateVisitor.save();

            res.send(true);
        });
    });
}

/**
 * 保存用户登录信息
 *
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
model.saveVisitor = function (data, res) {
    visitorModel.find({openid: data.openid}, (err, result) => {
        var newUser;
        var session_key = Date.parse(new Date());
        console.log(1, data.openid);
        if (!result.length) {
            newUser = new visitorModel({
                openid: data.openid,
                session: data.session_key,
                session_key: data.session_key + session_key //临时生成储存在客户端的session
            });

            newUser.save(err => {
                if (err) {
                    res.send(util.unifyRes({
                        data: false,
                        code: -1
                    }));
                }
                else {
                    res.send(util.unifyRes({
                        result: newUser.session_key
                    }));
                }
            })
        }
        else {
            console.log('老用户');
            res.send(util.unifyRes({
                result: result.session_key
            }));
            res.end();
        }
    });
}

module.exports = model;
