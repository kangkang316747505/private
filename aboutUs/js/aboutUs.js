$(function() {
        function interlinking(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
            var context = "";
            if (r != null)
                context = r[2];
            reg = null;
            r = null;
            return context == null || context == "" || context == "undefined" ? "" : context;
        }
        var item = interlinking('item');

        console.log(item);
        if (item==0) {
            console.log('企业介绍');
           $('.mapt>li').css({
               "color": "rgba(102, 102, 102, 1)"
           })
           $('.culture').css({
               "color": "rgb(227, 63, 70)"
           });
           $('.lis1').css({
               'display': 'block',
           });
           $('.lis4').css({
               'display': 'none',
           });
           $('.julp-K>a').css({
               'color': '#E13239',
           });
        }else if(item==1){
            console.log('自营品牌');
            $('.mapt>li').css({
                "color": "rgba(102, 102, 102, 1)"
            })
            $('.brandConcrete').css({
                "color": "rgb(227, 63, 70)"
            });
            $('.lis1').css({
                'display': 'none',
            });
            $('.lis4').css({
                'display': 'block',
            });
            $('.brand>a').css({
                'color': '#E13239',
            });
        }
        $('.mapt').on('click', 'li', function () {
            //按钮样式切换
            $(this).css({'color':'rgb(227, 63, 70)'}).siblings('li').css({'color':'rgb(102, 102, 102)'});
            //内容切换
            $('.mapb').children('li').eq($(this).index()).show().siblings('li').hide();
        })


        //发展历程
        $.ajax({
            type: 'POST',
            url: 'http://api.tianshuai.com.cn/adv/CourseApi',
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    var jh = data.data.result;
                    for (var i = 0; i < jh.length; i++) {
                        var _zkyear = '';
                        _zkyear += '<div class="zkyear"><div class="year"><h3>' + jh[i].year + '</h3><div class="months"></div></div></div>';
                        var jk = jh[i].month;
                        $('.course').append(_zkyear);
                        for (var j = 0; j < jk.length; j++) {
                                var _zyear = '';
                                _zyear += '<div class="month"><em>' + jk[j].month + '月<i class="circular"></i></em><div class="text"></div></div>';
                                $('.months').eq(i).append(_zyear);
                                var jl = jk[j].title;
                                for (var k = 0; k < jl.length; k++) {
                                    var _mon = '';
                                    _mon += '<p>' + jl[k].title + '</p>';
                                    $('.zkyear').eq(i).find('.text').eq(j).append(_mon)
                                }   
                            }
                        }
                } else if (data.code == 202) {
                    window.location = '/tinsine/html/errors.html';
                }
            }
        })
        //视频
        $(document).on("click", ".spans", function () {
            $(this).parent('.incey').siblings('.videosowb').css({
                "display": "block",
            }); 
            $('.videobrand').addClass("animated bounceIn")
            $(this).parent('.incey').siblings('.videosowb').children('.videobrand')[0].play();

        });
        $(document).on("click", ".videosowb>span", function () {
            $('.videosowb').css({
                "display": "none",
            });
            
            $(this).siblings('.videobrand')[0].pause();
        });
        $(document).on("mouseenter", ".cross", function () {
            $('.cross').css("color","#cccccc")
        })
        $(document).on("mouseleave", ".cross", function () {
            $('.cross').css("color", "rgb(177, 175, 175)")
        })
    })