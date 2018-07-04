$(function(){

    signingift();
    function signingift() {
        $.ajax({
        type: "POST",
            url: "http://activity.tinsine.com.cn/index/xllfd/actionXllList",
        data: {},
        dataType: 'html',
        success: function (data) {
            var json = JSON.parse(data);
            console.log(json.data.result);
                if (json.code == 200) {
                    //签到未领取礼物
                    var notsign = json.data.result.AlreadySign;
                    var _notsin ='';
                    var len = notsign.length;
                   
                    notsign.forEach(function(item,index){
                        len--;
                        _notsin += '<tr>';
                        _notsin += '<th class="thont">' + parseInt(len + 1) + '</th><th class="thont">' + item.truename +'</th>';
                        _notsin += '<th class="thont">' + item.telephone + '</th><th class="thont">' + item.source + '</th>';
                        _notsin += '<th class="thont"><button type="button" name="' + item.id+'" class="determine btn btn-primary">确认</button></th >';
                        _notsin += '</tr>';
                    });
                    $('.notsin').html(_notsin);
                    //签到已领取礼物
                    var sign = json.data.result.AlreadyReceived;
                    var _sin = '';
                    var signlen = sign.length;
                    sign.forEach(function (item1, index1) {
                        signlen--;
                        _sin += '<tr>';
                        _sin += '<th style="width: 23%;">' + parseInt(signlen + 1) + '</th><th style="width: 23.5%;">' + item1.truename + '</th>';
                        _sin += '<th style="width: 30.5%;">' + item1.telephone + '</th><th class"thtow">' + item1.source + '</th>';
                        _sin += '</tr>';
                    });
                    $('.trbute').html(_sin);
                    //未报名
                    var enroll = json.data.result.NotEnrolment;
                    var _enr = '';
                    var enrolllen = enroll.length;
                    enroll.forEach(function (item1, index1) {
                        enrolllen--;
                        _enr += '<tr>';
                        _enr += '<th style="width: 32%;">' + parseInt(enrolllen + 1) + '</th>';
                        _enr += '<th style="text-align:left;">' + item1.telephone + '</th>';
                        _enr += '</tr>';
                    });
                  
                    $('.enlist').html(_enr);
                } 
                else if (json.code == 202){

                }
            }
        })
    }
    $('body').on('click','.determine',function(){
        var id = $(this).attr('name');
        console.log(id);
        $.ajax({
            type: "POST",
            url: "http://activity.tinsine.com.cn/index/xllfd/actionConfirmSign",
            data: {
                "xid": id,
            },
            dataType: 'html',
            success: function (data) {
                var json = JSON.parse(data);
                console.log(json);
               
            }
        })
    })
    //重复执行 
    window.setInterval(signingift, 1000); 


})  