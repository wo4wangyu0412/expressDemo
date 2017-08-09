require("./add.scss");
require("../common/common.js");

$('form').submit(function(e) {
    e.preventDefault();

    var imgs = [];
    var reader = new FileReader();

    $('.page-pic').each(function() {
        if (this.files.length) {
            reader.readAsDataURL(this.files[0]);
        }
    });

    $('.addNewPic').on('click', function() {
    });

    reader.onload = function(e) {
        imgs.push(this.result);
        if (imgs.length === $('.page-pic').length) {
            pushData();
        }
    }

    function pushData() {
        var id = $('input[name="id"]').val();
        var name = $('input[name="name"]').val();
        var sex = $('input[name="sex"]:checked').val();
        var star = $('input[name="star"]').val();
        var paper = $('input[name="paper"]:checked').val();
        var cardNum = $('input[name="cardNum"]').val();
        var area = {
            contry: $('input[name="contry"]').val(),
            province: $('input[name="province"]').val(),
            city: $('input[name="city"]').val(),
        };
        var want = $('input[type="wantCity"').val();
        var intro = $('textarea[name="intro"]').val();

        var data = {
            id: id,
            name: name,
            sex: sex,
            star: star,
            paper: paper,
            paperPic: imgs,
            cardNum: cardNum,
            area: area,
            want: want,
            intro: intro
        };

        // $.each(data, function (index, item) {
        //     if (!item) {
        //         debugger
        //         alert('信息填写不完整');
        //         return false;
        //     }
        // });

        var dataStr = JSON.stringify(data);
        var successFn = function(e) {
            // window.location.reload();
        };

        $.ajax({
            method: 'POST',
            contentType: 'application/json;charset=utf-8',
            url: '/add/info',
            data: dataStr,
            success: successFn,
            err: function() {
                alert('err');
            }
        });
    }
});

function getbase(img) {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    var cxt = canvas.getContent('2d');
    cxt.drawImage(img, 0, 0, img.width, img.height);

    var dataUrl = canvas.toDataURL('image/png');

    return dataURL;
}
