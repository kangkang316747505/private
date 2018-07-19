$(function () {
    $.ajax({
        type: "POST",
        url: "http://api.tianshuai.com.cn/adv/PositionApi/actionPositionList",
        dataType: "json",
        success: function (data) {
            var pos = data.data.result.position;
            var cit = data.data.result.city;
            if (data.code == 200) {
                var _html = "";
                cit.forEach(function (item, index) {
                    _html += '<li class="spstr" onclick = sproyt(' + item.id + ")>" + item.city + "</li>"
                });
                $(".place>ul").append(_html);
                var dure = "";
                var num = 0;
                for (var j = 0; j < pos.length; j++) {
                    var _tst = "";
                    _tst += '<li class="product"><h3 class="works">' + pos[j].department + '</h3><ul class="her"></ul></li>';
                    $(".category>ul").append(_tst);
                    var jkhg = pos[j];
                    var _okl = "";
                    for (var k = 0; k < jkhg.position.length; k++) {
                        _okl += '<li><a href="">' + jkhg.position[k].position_name + "</a></li>"
                    }
                    $(".category>ul>li>ul").eq(j).append(_okl);
                    for (var b = 0; b < jkhg.position.length; b++) {
                        dure += "<li><h1>" + jkhg.position[b].position_name + '</h1><div class="duty"><h2>岗位职责：</h2><div class="contcots"><pre>' + jkhg.position[b].duty + '</pre></div></div><div class="require"><h2>岗位要求：</h2><div class="contcots"><pre>' + jkhg.position[b].requirement + "</pre></div></div></li>"
                    }
                    num += jkhg.position.length
                }
                $(".work_r>ul").append(dure);
                for (var o = 0; o < num; o++) {
                    $(".work_r>ul>li").eq(o).attr("id", "pop" + o);
                    $(".her>li>a").eq(o).attr("href", "#pop" + o)
                }
            } else {
                if (data.code == 202) {
                    window.location = "/tinsine/html/errors.html"
                }
            }
        }
    });
    $("body").on("click", ".place>ul>li", function () {
        $(this).css({
            "color": "rgba(91, 167, 255, 1)"
        }).siblings("li").css({
            "color": "#666"
        })
    });
    $(document).on("click", ".works", function () {
        $(this).addClass("ctab");
        $(this).next().slideToggle();
        $(this).parent().siblings().children(".works").removeClass("ctab").next().slideUp();
        $(this).css({
            "color": "rgba(91, 167, 255, 1)"
        });
        $(this).parent().siblings().children(".works").css({
            "color": "#666"
        })
    });
    $(document).ready(function () {
        $(".her>li").click(function () {
            $("html, body").animate({
                scrollTop: $($(this).attr("href")).offset().top + "px"
            }, 50000);
            return false
        })
    });
    $(window).scroll(function (event) {
        var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
        if (totalheight >= 1010) {
            $("main>.work>.work_l").addClass("workFix")
        } else {
            if (totalheight <= 1000) {
                $("main>.work>.work_l").removeClass("workFix")
            }
        }
        var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
        var jiao = $("footer").offset().top;
        if (totalheight > jiao) {
            $("main>.work>.work_l").addClass("worksix");
            $("main>.work>.work_l").removeClass("workFix")
        } else {
            $("main>.work>.work_l").removeClass("worksix")
        }
    })
});

function sproyt(city_id) {
    $.ajax({
        type: "POST",
        url: "http://api.tianshuai.com.cn/adv/PositionApi/actionPositionList",
        data: {
            "city_id": city_id
        },
        dataType: "json",
        success: function (data) {
            var pos = data.data.result.position;
            var num = 0;
            var _concat = "";
            if (data.code == 200) {
                $(".accdion").html("");
                for (var kp = 0; kp < pos.length; kp++) {
                    var _caption = "";
                    _caption += '<li class="product"><h3 class="works">' + pos[kp].department + '</h3><ul class="her"></ul></li>';
                    $(".category>ul").append(_caption);
                    var stip = pos[kp];
                    var _place = "";
                    for (var lp = 0; lp < stip.position.length; lp++) {
                        _place += '<li><a href="">' + stip.position[lp].position_name + "</a></li>"
                    }
                    $(".category>ul>li>ul").eq(kp).append(_place);
                    num += stip.position.length;
                    var position = pos[kp].position;
                    position.forEach(function (item3, index3) {
                        _concat += "<li><h1>" + item3.position_name + '</h1><div class="duty"><h2>岗位职责：</h2><div class="contcots"><pre>' + item3.duty + '</pre></div></div><div class="require"><h2>岗位要求：</h2><div class="contcots"><pre>' + item3.requirement + "</pre></div></div></li>"
                    });
                    $(".work_r>ul").html(_concat)
                }
                for (var o = 0; o < num; o++) {
                    $(".work_r>ul>li").eq(o).attr("id", "pop" + o);
                    $(".her>li>a").eq(o).attr("href", "#pop" + o)
                }
            } else {
                if (data.code == 202) {
                    window.location = "/tinsine/html/errors.html"
                }
            }
        }
    })
};