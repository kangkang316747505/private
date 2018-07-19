(function($) {
  // 分屏效果js
  $(function() {
    // 分屏数量
    var length = $('.page').length;
    var ratio = 0;
    var eq = 0;
    // 页面的高度
    var height = $('.page')
      .eq(0)
      .height();
    // footer 的高度
    var footerHeight = $('#foot-page').height();
    // 设置body高度
    $('body').css('height', height * (length - 1) + footerHeight);
    // 滚动条位置保存，用来确认是上还是下滚动
    var directionScroll = $(window).scrollTop();
    //执行一次，解决火狐和其他浏览器获取scrollTop的问题
    $(window).one('scroll', function() {
      directionScroll = $(window).scrollTop();
    });
    // 滚动事件
    $(window).scroll(function() {
      var scrollValue = $(window).scrollTop();
      eq = parseInt(scrollValue / height);
      var myscrollValue = scrollValue - eq * height;
      // 计算比率
      ratio = myscrollValue / height;
      // 上下滚动设置切换效果
      if (eq < length - 1) {
        $('#blackout').css('display', 'block');
        $('#blackout').css('opacity', 0.8 + eq - scrollValue / height);
        $('#blackout').css(
          'zIndex',
          $('.page')
            .eq(eq)
            .css('zIndex')
        );
      } 
      // top偏移值
      $('.page')
        .eq(eq)
        .css('top', eq * height - scrollValue);
      //设置菜单的底色
      setColor(scrollValue);
      // 修正top偏移值
      $('.page').each(function(index, item) {
        // 通过scrollTop判断当前在第几屏
        if (
          index * height < scrollValue &&
          scrollValue <= (index + 1) * height
        ) {
          if (scrollValue > directionScroll) {
            // 向下滚动
            if (index > 0) {
              $('.page')
                .eq(index - 1)
                .css('top', -height);
              //   检测滚动条是否到最低
              if ($('body').height() - height == scrollValue) {
                $('.page')
                  .eq(index)
                  .css('top', -height);
              }
            }
          } else if (scrollValue < directionScroll) {
            // 向上滚动
            if (index < length) {
              $('.page')
                .eq(index + 1)
                .css('top', 0);
            }
          } else if ((scrollValue = directionScroll)) {
            // 相等的时候，认定为页面刷新，恢复页面刷新前的状态(刷新为整屏)
            var currentPage = scrollValue - eq * height;
            for (var i = 0; i < eq; i++) {
              $('.page')
                .eq(i)
                .css('top', -height);
            }
            // 刷新后为整屏（1）
            // if (currentPage !== 0) {
            //     $('.page')
            //         .eq(eq)
            //         .css('top', 0);
            // }
            // $(window).scrollTop($(window).scrollTop() - currentPage);
            // 刷新后保持原样（2）
            if (currentPage !== 0) {
              $('.page')
                .eq(eq)
                .css('top', -currentPage);
            }
          }
        }
      });
      directionScroll = scrollValue;
    });
    // resize事件（重新设置高度）
    $(window).resize(function() {
      // 分屏数量
      length = $('.page').length;
      // 页面的高度
      height = $('.page')
        .eq(0)
        .height();
      // 设置body高度
      $('body').css(
        'height',
        $('.page')
          .eq(0)
          .height() * length
      );
      // 更改这里
      for (var i = 0; i < eq; i++) {
        $('.page')
          .eq(i)
          .css('top', -height);
      }
      $('.page')
        .eq(eq)
        .css('top', -height * ratio);
      var topValue = (eq + ratio) * height;
      $(window).scrollTop(topValue);
      // 滚动条位置保存，用来确认是上还是下滚动
      directionScroll = $(window).scrollTop();
    });
    function setColor(scrollValue) {
      var which = parseInt((scrollValue + 53) / height);
      switch (which) {
        case 0:
          $('#nav-list')
            .find('a')
            .css('color', '#fff');
            $('#nav_logo>a')
              .find('img')
              .attr('src', 'img/logo_l.png');
          break;
        case 1:
          $('#nav-list')
            .find('a')
            .css('color', '#333');
             $('#nav_logo>a')
             .find('img')
             .attr('src', 'img/logo.png');
          break;
        case 2:
          $('#nav-list')
            .find('a')
            .css('color', '#fff');
            $('#nav_logo>a')
              .find('img')
              .attr('src', 'img/logo-m.png');
          break;
        case 3:
          $('#nav-list')
            .find('a')
            .css('color', '#333');
            $('#nav_logo>a')
              .find('img')
              .attr('src', 'img/logo.png');
          break;
        case 4:
          $('#nav-list')
            .find('a')
            .css('color', '#333');
            $('#nav_logo>a')
              .find('img')
              .attr('src', 'img/logo.png');
          break;
        case 5:
          $('#nav-list')
            .find('a')
            .css('color', '#333');
            $('#nav_logo>a')
              .find('img')
              .attr('src', 'img/logo.png');
          break;
      }
      $('#nav-list')
            .find('.active')
            .css('color', '#E43D48');
    }
  });
})($);
