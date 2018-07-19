$(function () {
     var pageCurrent = 1;
     var pageSize = 9;
     $.ajax({
         type: "POST",
         url: "http://api.tianshuai.com.cn/adv/CasesApi",
         data: {
             "pageCurrent": pageCurrent,
             "pageSize": pageSize
         },
         dataType: 'html',
         success: function (result) { 
             var json = JSON.parse(result);
             var jh = json.data.result.case;
             var ban = json.data.result.banner;
             var zpage = json.data.PageList.pageNumber;
             $(".pagination").text(zpage);
             var _ban = "";
             ban.forEach(function (bans, index) {
                 _ban += '<div class="swiper-slide dunkl" sename="' + bans.link + '"  style="background-image:url(http://api.tianshuai.com.cn/' + bans.banner + ')"   >';
                 _ban += '</div>';
             });
             $(document).on('click', '.dunkl', function () {
                   var linkUrl= $(this).attr('sename')
                    window.location.href = linkUrl;
             })
             $('.dunk').html(_ban);
            
             var mySwiper = new Swiper('.swiper-container', {
                 loop: true,
                 autoplay: 3000,
                 nextButton: '.swipR',
                 prevButton: '.swipL',
                 pagination: '.swiper-pagination',
                 paginationClickable: true,
                 effect: 'fade',
                 fade: {
                     crossFade: false,
                 },
                 autoplayDisableOnInteraction: false,
             });
             $(".swiper-container").mouseenter(function () { //滑过悬停
                mySwiper.stopAutoplay(); //mySwiper 为上面你swiper实例化的名称
             }).mouseleave(function () { //离开开启
                mySwiper.startAutoplay();
             });
             
             var _onehtml = "";
            jh.forEach(function (item, index) {
                _onehtml += '<li class="li" onclick=numb(' + item.id + ')>';
                _onehtml += '<div class="subgrade" data-id = ' + item.id + '>';
                _onehtml += '<div class="limit">';
                _onehtml += '<img src="http://api.tianshuai.com.cn/' + item.cover + '">';
                _onehtml += '</div>';
                _onehtml += '</div>';
                _onehtml += '<div class="details">';
                _onehtml += '<p class ="p1"><span class="nkj">' + item.title + '</span><span class="time">' + dateFormat(new Date(item.ctime), 'yyyy.MM.dd') + '</span></p>';
                _onehtml += '<p class="p2">' + item.sponsor + '</p>';
                _onehtml += '</div>';
                _onehtml += '</li>';
            });
            $('.uls').html(_onehtml);
            
             
             $("#page").paging({
                 total: json.data.PageList.totalNumber,
                 numberPage: json.data.PageList.pageSize,
                 pageNumber: json.data.PageList.pageNumber
             }, function (msg) { //回调
                 $.ajax({
                     type: "POST",
                     url: "http://api.tianshuai.com.cn/adv/CasesApi",
                     data: {
                         "pageCurrent": msg,
                         "pageSize": pageSize
                     },
                      dataType: 'html',
                     success: function (msg) {
                        var msgs = JSON.parse(msg);
                        var thisData = msgs.data.result.case;
                        var _html = '';
                         thisData.forEach(function (item1, index){
                             _html += '<li class="li" onclick=numb(' + item1.id + ')>';
                             _html += '<div class="subgrade" data-id = ' + item1.id + '>';
                             _html += '<a href="####"><img src="http://api.tianshuai.com.cn/' + item1.cover + '"></a>';
                             _html += '</div>';
                              _html += '<div class="details">';
                              _html += '<p class ="p1"><span class="nkj">' + item1.title + '</span><span class="time">' + dateFormat(new Date(item1.ctime), 'yyyy.MM.dd') + '</span></p>';
                              _html += '<p class="p2">' + item1.sponsor + '</p>';
                              _html += '</div>';
                              _html += '</li>';
                         });
                         $('.uls').html(_html);
                        
                     }
                 });
             });
         }
     });
    //转化时间
    function dateFormat(x, y) {
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
    $(document).on('mouseenter mouseleave', '.dun', function () {
       $('.swipjt').toggle();
    });

   
});