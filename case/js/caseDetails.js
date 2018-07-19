$(function () {
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    }
    var id = GetQueryString('id');
    $.ajax({
        type: 'POST',
        url: 'http://api.tianshuai.com.cn/adv/CasesApi/actionCaseDef',
        dataType: 'json',
        data: {
            case_id: id,
        },
        success: function(data) {
            
            if (data.code == 200) {
                $('.middle-m>.middle-mL').append(data.data.contents);
                $('.middle-m>.middle-mT>h1').html(data.data.title);
                $('.middle-m>.middle-mT>h2>.nsor').html(data.data.sponsor);
                $('title').html(data.data.title);
                $('.middle-m>.middle-mT>h2>#htime').html(date2str(new Date(data.data.ctime),'yyyy.MM.dd'));
                var back = data.data.background;
                if (back == "" || back == null || back == 'undefined') {
                     $('.banner').css({
                         'background': 'url(img/ban.png) no-repeat center center',
                        });
                } else {
                    $('.banner').css({
                        'background': 'url("http://api.tianshuai.com.cn/' +
                        data.data.background + '") no-repeat center center',
                    });
                }
            }
            else if (data.code == 202) {
                window.location = '/tinsine/html/errors.html';
            }
        }
    })
    function date2str(x, y) {
        var z = {
            M: x.getMonth() + 1,
            d: x.getDate(),
            h: x.getHours(),
            m: x.getMinutes(),
            s: x.getSeconds()
        };
        y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
            return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
        });
        return y.replace(/(y+)/g, function (v) {
            return x.getFullYear().toString().slice(-v.length)
        });
    }
    
})