$(function(){
    
        //视频
         $.ajax({
            type: 'POST',
            url: 'http://api.tianshuai.com.cn/adv/DynamicApi',
            dataType: 'json',
            async :false,
            success: function (data) {
                if (data.code == 200) {
                    var vide = data.data.result;
                    var _ptime = '';
                    vide.forEach(function (item1, index1) {
                        _ptime += '<div class="big1">';
                        _ptime += '<div class="glop"><div class="maske"></div><i class="iconfont icon-video kop"></i><img class="bigimgs" src="http://api.tianshuai.com.cn/' + item1.cover + '"  alt=""></div>';
                        _ptime += '<h1 class="titlel">' + item1.title + '</h1>';
                        _ptime += '<p class="timep">' + date2str(new Date(item1.ctime), 'yyyy.MM.dd') + '</p>';
                        _ptime += '<span class="way">http://api.tianshuai.com.cn/' + item1.video_link + '</span>'
                        _ptime += '<span class="bigway">http://api.tianshuai.com.cn/' + item1.cover + '</span>'
                        _ptime += '</div>'
                    }); 
                    $('.over').append(_ptime);
                    $('.imgags>video').attr("src", 'http://api.tianshuai.com.cn/'+vide[0].video_link+'')
                    $('.imgags>video').attr("poster", 'http://api.tianshuai.com.cn/' + vide[0].cover + '')
                    $('.span1').text(vide[0].title);
                    $('.span2').text(date2str(new Date(vide[0].ctime), 'yyyy.MM.dd'));
                } else if (data.code == 202) {
                    window.location = '/tinsine/html/errors.html';
                }
            }
        })
        $('.big1').eq(0).find('.glop').find('.kop').css({
            'display': 'block'
        })
        $('.big1').eq(0).find('.glop').find('.maske').css({
            'display': 'block'
        })
        // 点击
         $(document).on("click", ".malz>.over>.big1",function () {
            $('.span1').text($(this).find('.titlel').text());
            $('.span2').text($(this).find('.timep').text()); 
            $('.imgags>video').attr("src",$(this).find('.way').text());
            $('.imgags>video').attr("poster", $(this).find('.bigway').text());
        })
        $(document).on("click", ".malz>.over>.big1", function (){
            $(".big1").find(".maske").hide();
            $(this).find(".maske").show();
            $(".big1").find(".kop").hide();
            $(this).find(".kop").show();
        })
        var len = $(".over").children('.big1').length;
        var sizes = 0;
        var a = 1;
            //左边
            $(".btnl").on("click", function () {
                    if (sizes < len-4) {
                    sizes++;
                    $('.over').animate({
                        left: -270 * a,
                    }, 300);
                    a++;
                    console.log(sizes);
                    } 
                    else if (sizes = len - 4) {
                        sizes = -1;
                        a = 0;
                        $('.over').animate({
                            left:0,
                        }, 300);
                        a++;
                        sizes++;
                }
            })
            //右边
            $(".btnr").on("click", function () {
                if (sizes < len - 4) {
                    sizes++;
                    $('.over').animate({
                        left: -270 * a,
                    }, 300);
                    a++;
                } else if (sizes = len - 4) {
                    sizes = -1;
                    a = 0;
                    $('.over').animate({
                        left: 0,
                    }, 300);
                    a++;
                    sizes++;
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
 
