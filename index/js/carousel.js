(function($) {
  // 分屏效果js
  $(function() {
    var total = Number($('#total').text());
    var oSlider = $('.HomeSlider-inner').find('.HomeSlider-section');
    var swiper = new Swiper('#us', {
      effect: 'flip',
      grabCursor: true,
      simulateTouch: false
    });
    $('#HomeSliderNav-prev').click(function() {
      // 上一页
      if ($(this).hasClass('btn-disabled')) {
        // 有.btn-disabled说明次按钮必能点击，故不触发事件
        return;
      }
      last();
      swiper.slidePrev();
    });
    $('#HomeSliderNav-next').click(function() {
      // 下一页
      if ($(this).hasClass('btn-disabled')) {
        // 有.btn-disabled说明次按钮必能点击，故不触发事件
        return;
      }
      next();
      // 翻到下一页
      swiper.slideNext();
    });
    function canClick() {
      // 是否可以点击状态控制
      var current = Number($('#current').text());
      if (current == 1) {
        $('#HomeSliderNav-prev').addClass('btn-disabled');
        $('#HomeSliderNav-next').removeClass('btn-disabled');
      }
      if (current > 1 && current < total) {
        $('#HomeSliderNav-prev').removeClass('btn-disabled');
        $('#HomeSliderNav-next').removeClass('btn-disabled');
      }
      if (current == total) {
        $('#HomeSliderNav-prev').removeClass('btn-disabled');
        $('#HomeSliderNav-next').addClass('btn-disabled');
      }
    }

    function last() {
      var current = Number($('#current').text());
      current--;
      if (current >= 1) {
        $('#current').text(current);
      }
      canClick();
    }

    function next() {
      var current = Number($('#current').text());
      current++;
      if (current <= total) {
        $('#current').text(current);
      }
      canClick();
    }
  });
})($);
