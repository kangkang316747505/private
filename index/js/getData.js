(function ($) {
    // 获取数据加载到页面
    $(function () {
        var exampleSwiper = null;
        var exampleFlag = true;
        getPartner();
        // 页面加载执行两次，提前获得下一批
        getExampleData();
        // 案例点击事件
        $('#change-example').click(function () {
            var pageNum = $('#change-example').attr('pageNum');
            if (
                $('#change-example').attr('total') &&
                pageNum >= $('#change-example').attr('total')
            ) {
                $('#change-example').attr('pageNum', 1);
                exampleSwiper.slideTo(0, 1000, false);
            } else {
                exampleSwiper.slideNext();
                $('#change-example').attr('pageNum', ++pageNum);
            }

            // 请求下下页数据事件
            exampleFlag && getExampleData();
        });
        // 案例换一批
        function getExampleData() {
            var pageNum = $('#change-example').attr('pageNum');
            $.ajax({
                url: 'http://api.tianshuai.com.cn/adv/IndexApi/Another_batch',
                type: 'POST',
                data: {
                    pageNum: pageNum
                },
                success: function (res) {
                    if (res.code == 200 && res.data) {
                        var is_batch = res.data.result.is_batch;
                        var data = res.data.result.case || [];
                        // 设置pagename属性
                        if (!is_batch) {
                            $('#change-example').attr('total', --pageNum);
                            $('#change-example').attr('pageNum', pageNum);
                            exampleFlag = false;
                        }
                        // 更换页面数据
                        setExample(data);
                    }
                },
                error: function (error) {
                    console.warn(error);
                }
            });
        }

        function getPartner() {
            $.ajax({
                url: 'http://api.tianshuai.com.cn/adv/IndexApi',
                type: 'POST',
                success: function (res) {
                    if (res.code == 200 && res.data) {
                        var partner = res.data.result.partner || [];
                        var data = res.data.result.case || [];
                        $('#change-example').attr('pageNum', 2);
                        // 案例
                        data && setExample(data);
                        exampleSwiper = new Swiper('#swiper-two', {
                            direction: 'horizontal',
                            observer: true,
                            observeParents: true,
                            simulateTouch: false
                            // loop: true,
                            // autoplay: {
                            //     delay: 3000,
                            //     stopOnLastSlide: false,
                            //     disableOnInteraction: true,
                            // }
                        });
                        //  合作伙伴
                        setPartner(partner);
                    }
                },
                error: function (error) {
                    console.warn(error);
                }
            });
        }

        function setExample(data) {
            var exampleHtml = [];
            var exampleHtmls = '';
            data.forEach(function (item, index) {
                var html = '';
                html += '<div class="case-study" onclick=numb(' + item.id + ')>';
                html += '<div class="widthimg">';
                html += '<div class="img">';
                html +=
                    '<img src="http://api.tianshuai.com.cn/' +
                    item.cover +
                    '" alt="' +
                    item.title +
                    '">';
                html += '</div>';
                html += '</div>';
                html += '<div class="exp-img">';
                html += '<p class="title">' + item.title + '</p>';
                html += '<p class="sponsor">' + item.sponsor + '</p>';
                html += '</div>';
                html += '</div>';
                exampleHtml.push(html);
            });
            // var surplus = partner.length % 14;
            var times = parseInt(data.length / 3);
            exampleHtml.forEach(function (item, index) {
                if (times == 0) {
                    // 不足14个
                    if (index == 0) {
                        // 第一个
                        exampleHtmls += '<div class="swiper-slide">';
                        exampleHtmls += '<div class="example">';
                    }
                    exampleHtmls += item;
                    if (index == data.length - 1) {
                        // 最后一个
                        exampleHtmls += '</div>';
                        exampleHtmls += '</div>';
                    }
                } else {
                    // 超过14个
                    if (index == 0) {
                        // 第一个
                        exampleHtmls += '<div class="swiper-slide">';
                        exampleHtmls += '<div class="example">';
                    } else if (index % 3 == 0 && index != data.length - 1) {
                        exampleHtmls += '</div>';
                        exampleHtmls += '</div>';
                        exampleHtmls += '<div class="swiper-slide">';
                        exampleHtmls += '<div class="example">';
                    }
                    exampleHtmls += item;
                    if (index == partner.length - 1) {
                        // 最后一个
                        exampleHtmls += '</div>';
                        exampleHtmls += '</div>';
                    }
                }
            });
            $('#example').append(exampleHtmls);
        }

        function setPartner(partner) {
            var partnerHtml = [];
            var partnerHtmls = '';
            partner.forEach(function (item, index) {
                var html = '';
                html += '<li>';
                html += '<a target="_blank" href="' + item.link + '">';
                html +=
                    '<img src="http://api.tianshuai.com.cn/' +
                    item.logo +
                    '" alt="' +
                    item.company +
                    '">';
                html += '</a>';
                html += '</li>';
                partnerHtml.push(html);
            });
            // var surplus = partner.length % 14;
            var times = parseInt(partner.length / 14);
            partnerHtml.forEach(function (item, index) {
                if (times == 0) {
                    // 不足14个
                    if (index == 0) {
                        // 第一个
                        partnerHtmls += '<div class="swiper-slide">';
                        partnerHtmls += '<div class="parter">';
                        partnerHtmls += '<ul>';
                    }
                    partnerHtmls += item;
                    if (index == partner.length - 1) {
                        // 最后一个
                        partnerHtmls += '</ul>';
                        partnerHtmls += '</div>';
                        partnerHtmls += '</div>';
                    }
                } else {
                    // 超过14个
                    if (index == 0) {
                        // 第一个
                        partnerHtmls += '<div class="swiper-slide">';
                        partnerHtmls += '<div class="parter">';
                        partnerHtmls += '<ul>';
                    } else if (index % 14 == 0 && index != partner.length - 1) {
                        partnerHtmls += '</ul>';
                        partnerHtmls += '</div>';
                        partnerHtmls += '</div>';
                        partnerHtmls += '<div class="swiper-slide">';
                        partnerHtmls += '<div class="parter">';
                        partnerHtmls += '<ul>';
                    }
                    partnerHtmls += item;
                    if (index == partner.length - 1) {
                        // 最后一个
                        partnerHtmls += '</ul>';
                        partnerHtmls += '</div>';
                        partnerHtmls += '</div>';
                    }
                }
            });
            $('#partner').append(partnerHtmls);
            var mySwiper = new Swiper('#swiper-one', {
                direction: 'vertical',
                observer: true,
                observeParents: true,
                loop: true,
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: true
                }
            });
            $(".swiper-container").mouseenter(function () { //滑过悬停
                mySwiper.autoplay.stop(); //mySwiper 为上面你swiper实例化的名称
            }).mouseleave(function () { //离开开启
                mySwiper.autoplay.start();
            });
        }
    });
})($);
