$(function(){
   
    vailPhone();
    //判断手机号
    function vailPhone() {
        $('#signChack').on('click', function () {
        var phone = $(".case").val();
        var myreg = /^1[34578]\d{9}$/;
            if (phone == '') {
                $('.mallmask').html('手机号码不能为空');
                $(".mallmask").show().delay(3000).hide(300);
            }else if (phone.length != 11) {
                $('.mallmask').html('手机号码未输入指定位数');
                $(".mallmask").show().delay(3000).hide(300);
            }else if (!myreg.test(phone)) {
                $('.mallmask').html('手机号码不正确');
                $(".mallmask").show().delay(3000).hide(300);
            }
            else if (myreg.test(phone)) {
                $(".mallmask").show();
                checkPhoneIsExist();
            }
        }
    )}

    function checkPhoneIsExist() {
        var telephone = $(".case").val();
        $.ajax({
            type: "POST",
            url: "http://www.activity.com/index/xllfd/actionSignVerify",
            data: {
                "telephone":telephone,
            },
            dataType: 'html',
            success: function (result) {
                var json = JSON.parse(result);
                if (json.code == 200) {
                    if(json.data.is_type == 3 ){
                        $('.mallmask2').html('签到成功,请领取' + json.data.count+'个大礼包');
                        $(".mallmask").show();
                    }else if (json.data.is_type == 2) {
                         $('.mallmask2').html('签到成功,请领取' + json.data.count + '个小礼包');
                        $(".mallmask").show();
                    }else if (json.data.is_type == 1) {
                        $('.mallmask2').html('签到成功,请领取' + json.data.count + '张门票');
                        $(".mallmask").show();
                    }
                } else if (json.code == 401) {
                } else if (json.code == 402) {
                   $('.mallmask2').html('您已经签过到了哟~');
                   $(".mallmask").show().delay(3000).hide(300);
                } else if (json.code == 403) {
                   $('.mallmask2').html('报名成功请领取一张门票哟~');
                   $(".mallmask").show().delay(3000).hide(300);
                } else if (json.code == 202) {
                    $('.mallmask2').html('您签到失败了哟~');
                    $(".mallmask").show().delay(3000).hide(300);
                }   
            }
        })
    }
})