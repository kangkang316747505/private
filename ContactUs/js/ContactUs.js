$(function () {
    
    $(".title").on("click", "li", function () {
        $(this).addClass('tlp').siblings('li').removeClass('tlp');
        
        $('.condonf').children('li').eq($(this).index()).show().siblings('li').hide();
    })
    var pageCurrent = 1;
    var pageSize = 4;
    $.ajax({
        type: "POST",
        url: "http://api.tianshuai.com.cn/adv/ContactApi",
        data: {
            "pageCurrent": pageCurrent,
            "pageSize": pageSize
        },
        dataType: 'html',
        success: function (result) {
            var json = JSON.parse(result);
            var thisData = json.data.result;
            console.log(json);
            if (json.code == 200) {
                var _img = '';
                for (var i = 0; i < thisData.length; i++) {
                    _img += '<div class="personal_o clearFix"><div class="pesonPl"><img src="http://api.tianshuai.com.cn\/' + thisData[i].cover + '" class="blur" alt=""><span class="backg"><i class="iconfont icon-video vision"></i></span><div class="videoPlay"><video class = "videocont" src ="http://api.tianshuai.com.cn\/' + thisData[i].video + '" controls = "controls" ></video><span class="iconfont icon-chahao"></span></div><div class = "per-footer"><span><i class = "iconfont icon-weixin wchat1"></i><div class="wechat1"><div class="specific">' + thisData[i].wechat + '</div><div class="triangle  ple1"></div></div></span><span><i class="iconfont icon-youxiang wchat2"></i><div class="wechat2"><div class="specific" > ' + thisData[i].email + ' </div><div class="triangle ple2"></div></div></span><span><i class="iconfont icon-shouji wchat3"></i><div class="wechat3"><div class="specific">' + thisData[i].telephone + '</div><div class="triangle ple3"></div></div></span></div></div><div class="pesonPr"><h2>' + thisData[i].truename + '</h2><h3>' + thisData[i].position + '</h3><p>' + thisData[i].describe + '</p></div></div>';
                }
                $(".personal").html(_img);

            } else if (json.code == 202) {
                window.location = '/tinsine/html/errors.html';
            }
            // $("#page").paging({
            //     total: json.data.PageList.totalNumber,
            //     numberPage: json.data.PageList.pageSize
            // }, function (msg) { //回调
            //     $.ajax({
            //         type: "POST",
            //         url: "http://api.tianshuai.com.cn/adv/ContactApi",
            //         data: {
            //             "pageCurrent": msg,
            //             "pageSize": pageSize
            //         },
            //         dataType: 'html',
            //         success: function (msg) {
            //             var msge = JSON.parse(msg);
            //             
            //             var thismsge = msge.data.result;
            //                 if (json.code == 200) {
            //                 var _img = '';
            //                 for (var i = 0; i < thismsge.length; i++) {
            //                     _img += '<div class="personal_o clearFix"><div class="pesonPl"><img  src="http://api.tianshuai.com.cn\/' + thismsge[i].cover + '" class="blur" alt=""><span class="backg"><i class="iconfont icon-video vision"></i></span><div class="videoPlay"><video class = "videocont" src ="http://api.tianshuai.com.cn\/' + thismsge[i].video + '" controls = "controls" ></video><span class="iconfont icon-chahao"></span></div></div><div class="pesonPr"><h2>' + thismsge[i].truename + '</h2><h3>' + thismsge[i].position + '</h3><p>' + thismsge[i].describe + '</p><div class="per-footer"><span><i class="iconfont icon-weixin wchat1"></i><div class="wechat1"><div class="specific">' + thismsge[i].wechat + '</div><div class="triangle  ple1"></div></div></span><span><i class="iconfont icon-youxiang wchat2"></i><div class="wechat2"><div class="specific">' + thismsge[i].email + '</div><div class="triangle ple2"></div></div></span><span><i class="iconfont icon-shouji wchat3"></i><div class="wechat3"><div class="specific">' + thismsge[i].telephone + '</div><div class="triangle ple3"></div></div></span></div></div></div>';
            //                 }
            //                 $(".personal").html(_img);
            //                  } else if (json.code == 202) {
            //                         window.location = '/tinsine/html/errors.html';
            //                 }
            //         }
            //     });

            // });

        }
    });

    //显示隐藏效果
    $(document).on('mouseenter mouseleave', '.per-footer>span>.wchat1', function () {
        $(this).siblings('.wechat1').toggle();
    });
    $(document).on('mouseenter mouseleave', '.per-footer>span>.wchat2', function () {
        $(this).siblings('.wechat2').toggle();
    });
    $(document).on('mouseenter mouseleave', '.per-footer>span>.wchat3', function () {
        $(this).siblings('.wechat3').toggle();
    });
    //视频
    $(document).on("click", ".vision", function () {
       $(this).parent('.backg').siblings('.videoPlay').css({
            "display": "block",
        });
      $(this).parent('.backg').siblings('.videoPlay').children('.videocont')[0].play();
 
    });
    $(document).on("click", ".videoPlay>span", function () {
        $('.videoPlay').css({
            "display": "none",
        });
        $(this).siblings('.videocont')[0].pause();
    });
    $(document).on("mouseenter", ".videoPlay", function () {
        $('.videocont').siblings('span').addClass("rotateIn animated")
    })
    $(document).on("mouseleave", ".videoPlay", function () {
        $('.videocont').siblings('span').removeClass("rotateIn animated")
    })
})