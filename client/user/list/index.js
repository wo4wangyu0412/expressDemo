require('../../common/common.js');
require('../../common/common.scss');
require('./index.scss');

$('.delete-btn').on('click', function(e) {
    var id = $(e.target).attr('id');

    var msg = '确认删除此条信息么';

    if (confirm(msg)) {
        delInfo(id);
    }
    /**
     * tip: 此处不能用箭头函数，因为其赋值语句不会被预执行。会报错
     *
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    function delInfo(id) {
        var data = {
            id: id
        };

        var dataStr = JSON.stringify(data);

        $.ajax({
            method: 'POST',
            url: '/user/delete',
            contentType: 'application/json;charset=utf-8',
            data: dataStr,
            success: function() {
                window.location.reload();
            }
        });
    }
})