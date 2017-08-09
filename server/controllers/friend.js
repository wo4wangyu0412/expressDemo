var friendModel = require('../../server/models/friend');
var https = require('https');

var loginUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxc45417aadfd02219&secret=8e6d662521d2fb6df68f11a6faff335f&grant_type=authorization_code&js_code=';

exports.login = function(code, res) {
    https.get(loginUrl + code, function (sendRes) {
        sendRes.on('data', function (data) {
            sendRes.setEncoding('utf8');
            var data = JSON.parse(data);
            console.log(data);
            if (data.openid) {
                friendModel.saveVisitor(data, res);
            }
            else {
                res.send(util.unifyRes({
                    data: false,
                    code: -1
                }));
            }
        });
    });
};

/**
 * 根据身份证号绑定会员
 *
 * @param  {[type]}   data [description]
 * @param  {Function} fn   [description]
 * @param  {[type]}   res  [description]
 * @return {[type]}        [description]
 */
exports.checkCode = (data, fn, res) => {
    friendModel.checkByCode(data, fn ,res);
}
