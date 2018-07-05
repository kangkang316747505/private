$(function(){
    isIPhoneX();
    function isIPhoneX() {
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isIOS) {
            if (screen.height == 812 && screen.width == 375) {
                $('.gather').css({
                    "height":"21.65rem"
                })
            } else {
                $('.gather').css({
                    "height": "100%"
                })
            }
        }
    }
    vailPhone();
    var reveal = $(".mallmask").css({"padding": "0.3rem 0.5rem"});
    //判断手机号
    function vailPhone() {
        $('#signChack').on('click', function () {
        var phone = $(".case").val();
        var myreg = /^1[34578]\d{9}$/;
            if (phone == '') {
                $('.mallmask2').html('手机号码不能为空');
                reveal;
                $(".mallmask").show().delay(3000).hide(300);
            }
            else if (myreg.test(phone)) {
                checkPhoneIsExist();
            }
            else if (phone.length != 11) {
                reveal;
                $('.mallmask2').html('手机号码未输入指定位数');
                $(".mallmask").show().delay(3000).hide(300);
            }else if (!myreg.test(phone)) {
                reveal;
                $('.mallmask2').html('手机号码不正确');
                $(".mallmask").show().delay(3000).hide(300);
            }
        }
    )}

    function checkPhoneIsExist() {
        var telephone = $(".case").val();
        console.log(telephone);
        $.ajax({
            type: "POST",
            url: "http://activity.tinsine.com.cn/index/xllfd/actionSignVerify",
            data: {
                "telephone":telephone,
            },
            dataType: 'html',
            success: function (result) {
                var json = JSON.parse(result);
                if (json.code == 200) {
                    if(json.data.is_type == '3' ){
                        $('.mallmask2').html('签到成功,请领取' + json.data.count+'个大礼包');
                        reveal;
                        $(".mallmask").show();
                    }else if (json.data.is_type == '2') {
                         $('.mallmask2').html('签到成功,请领取' + json.data.count + '个小礼包');
                         reveal;
                        $(".mallmask").show();
                    }else if (json.data.is_type == '1') {
                        $('.mallmask2').html('签到成功,请领取' + json.data.count + '张门票');
                        reveal;
                        $(".mallmask").show();
                    }
                } else if (json.code == 401) {
                } else if (json.code == 402) {
                   $('.mallmask2').html('您已经签过到了哟~');
                   reveal;
                   $(".mallmask").show().delay(3000).hide(300);
                } else if (json.code == 403) {
                   $('.mallmask2').html('报名成功请领取一张门票哟~');
                   reveal;
                   $(".mallmask").show();
                } else if (json.code == 202) {
                    $('.mallmask2').html('您签到失败了哟~');
                    reveal;
                    $(".mallmask").show().delay(3000).hide(300);
                }   
            }
        })
    }
})