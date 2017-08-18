define('http://rz.liepin.com/Liepin/js/main.js', ["//concat.lietou-static.com/core/h5/v2/zepto/zepto.js", "//concat.lietou-static.com/core/h5/v1/switchui/pagesBox.js", "//concat.lietou-static.com/core/h5/v2/crossajax/crossajax.js", "//concat.lietou-static.com/core/h5/v1/dialogs/minidialog.js", "http://rz.liepin.com/Liepin/js/canvasResize.js", "http://rz.liepin.com/Liepin/js/hammer.js"], function(require, exports) {
  var $ = require("//concat.lietou-static.com/core/h5/v2/zepto/zepto.js");
  require("//concat.lietou-static.com/core/h5/v2/crossajax/crossajax.js");

  require("//concat.lietou-static.com/core/h5/v1/switchui/pagesBox.js")($, window);
  var minidialog = require("//concat.lietou-static.com/core/h5/v1/dialogs/minidialog.js");
  require("http://rz.liepin.com/Liepin/js/canvasResize.js");

  require("http://rz.liepin.com/Liepin/js/hammer.js");
  var _height = parseInt(document.documentElement.clientHeight, 10);
  var _width = parseInt(document.documentElement.clientWidth, 10);
  var audio = document.getElementById("audioc");
  var bodyfont = 32 * _height / 960;
  var music = document.getElementById("music");
  var loading = $('.loading-container');
  //加载图片列表
  var imgList = [
    'http://rz.liepin.com/Liepin/img/page1-bg.png',
    'http://rz.liepin.com/Liepin/img/page1-logo.png',
    'http://rz.liepin.com/Liepin/img/page1-title1.png'
  ];
  var pagelist = $('.container .pagelist');
  var list = pagelist.pagesBox({
    pages: 'section',
    speed: 500,
    easing: 'ease-in-out',
    hash: false,
    orientScale: false,
    unTouchedPages: '.page6',
    threshold: 80
  });

  // pagelist.pagesBox('offTouch');
  pagelist.on("gopage", function(e, to, from) {
    $('section').eq(from).toggleClass('active');
    $('section').eq(to).toggleClass('active');
    if (to == 5) {
      $('.music-btn').hide();
      music.pause();
    }
  });


  loading.css('display', 'none');



  var element = document.querySelector('.show');
  var $element = $('.show');
  var loc = {
    x: 0,
    y: 0,
    offT: 0,
    offL: 0,
    scale: 1,
    w: $element.width(),
    h: $element.height(),
    photoWidth: $('.photo').width(),
    photoHeight: $('.photo').height(),
    initWidth: $('.photo').width(),
    initHeight: $('.photo').height()
  };



  var timer;
  // 对照片的移动等处理
  var hammertime = new Hammer(element);
  hammertime.get('pan').set({
    direction: Hammer.DIRECTION_ALL
  });
  hammertime.get('pinch').set({
    enable: true
  });

  hammertime.on("pan", function(event) {
    $element.find('.photo').css({
      left: loc.x + event.deltaX,
      top: loc.y + event.deltaY
    });
  });

  hammertime.on("panend", function(event) {
    loc.x = loc.x + event.deltaX;
    loc.y = loc.y + event.deltaY;
  });

  hammertime.on("pinch", function(event) {
    clearTimeout(timer);
    hammertime.get('pan').set({
      enable: false
    });
    var scale = parseFloat(event.scale.toFixed(2));
    var w, h;
    $element.find('.photo').css({
      width: loc.photoWidth * scale,
      height: loc.photoHeight * scale,
      left: loc.x - (loc.photoWidth * scale - loc.photoWidth) / 2,
      top: loc.y - (loc.photoHeight * scale - loc.photoHeight) / 2
    });

  });

  hammertime.on("pinchend", function(event) {
    var scale = event.scale.toFixed(2);
    loc.x = loc.x - (loc.photoWidth * scale - loc.photoWidth) / 2;
    loc.y = loc.y - (loc.photoHeight * scale - loc.photoHeight) / 2;
    loc.photoWidth = loc.photoWidth * scale;
    loc.photoHeight = loc.photoHeight * scale;

    timer = setTimeout(function() {
      hammertime.get('pan').set({
        enable: true
      });
    }, 500);
  });


  $('.selectfile').on('change', function() {
    var id = $(this).attr('id');
    var oFile = document.querySelector('#' + id).files[0];

    var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;

    if (!rFilter.test(oFile.type)) {
      new minidialog({
        html: '图片格式不正确，请重新选择',
        autoHide: 2000,
        modal: true
      });
      return;
    }

    if (oFile.size > 5242280) {
      new minidialog({
        html: '图片尺寸不能大于3M',
        autoHide: 2000,
        modal: true
      });
      return;
    }

    canvasResize(oFile, {
      width: 300,
      height: 0,
      crop: false,
      quality: 100,
      rotate: 0,
      callback: function(data, width, height) {
        $('.photo').attr('src', data);
        setTimeout(function() {
          loc = {
            x: 0,
            y: 0,
            offT: 0,
            offL: 0,
            scale: 1,
            w: $element.width(),
            h: $element.height(),
            photoWidth: $('.photo').width(),
            photoHeight: $('.photo').height(),
            initWidth: $('.photo').width(),
            initHeight: $('.photo').height()
          }
        }, 100);

        // $('.shape').css('display', 'none');
        $('.example').css('display', 'none');
        // $('.p4-btn').css('display', 'none');
        // $('.btn-block').css('display', 'block');
      }
    });
  });


  // var mySwiper = new Swiper('.swiper-container', {
  //   pagination: '.swiper-pagination',
  //   slidesPerView: 4,
  //   direction: 'horizontal',
  //   spaceBetween: 8,
  //   loop: true,

  //   // 如果需要前进后退按钮
  //   nextButton: '.swiper-button-next',
  //   prevButton: '.swiper-button-prev',

  // });


  imgPreload(imgList, function() {

    document.addEventListener("WeixinJSBridgeReady", function() {
      music.play();
    }, false);
    music.play();
    $(".music-btn").show();
    setTimeout(function() {
      loading.css('display', 'none');
      $('section.page1').addClass('active');
    }, 500);
  });

  function imgPreload(imgArr, callback) {

    var solvedNum = imgArr.length;
    imgArr.forEach(function(v, i) {
      var img = new Image();
      img.src = v;
      if (img.complete) { //如果图片已经存在于浏览器缓存，直接调用回调函数
        checkSolved();
        return; // 直接返回，不用再处理onload事件
      }
      img.onload = function() {
        checkSolved();
      };
    });


    function checkSolved() {
      solvedNum--;
      if (solvedNum == 0) {
        callback && callback();
      }
    }
  }


  $('.page6 .btn-group .ele .main-btn').on('click', function() {
    var index = $('.main-btn').index($(this));
    $(this).parent().find('.checked').css('display', 'block').parent().siblings().find('.checked').hide();
    var now_role = $(this).attr('data-role');
    $('.content').attr('class', 'content content-' + now_role);
    $('.page6 .tab-box .introduce-txt').eq(index).addClass('active')
      .siblings('.introduce-txt').removeClass('active');
  });

  $('.container .pagelist .page9 .btn-group .details').on('click', function() {
    $('.container .pagelist .page9 .alert').css('display', 'block');
  });
  $('.container .pagelist .page9 .alert .close').on('click', function() {
    $('.container .pagelist .page9 .alert').hide();
  });

  $('.container .pagelist .page6 .btn-group-second .sure').on('click', function() {
    print();

    document.getElementById('music-click').play();
  });
  var firstFlag = true;
  $('.container .pagelist .page6 .part-first .sure').on('click', function() {
    $('.container .pagelist .page6 .part-first').hide();
    $('.layer,.icon-box').css('display', 'block');
    $('.icon-box').html('');
    $('.page6 .part-second').css('display', 'block');
    if (firstFlag) {
      var mySwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 4,
        direction: 'horizontal',
        spaceBetween: 8,
        loop: true,
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
      });
    }
    firstFlag = false;
  });
  $('.container .pagelist .page6 .part-second .rechoose').on('click', function() {
    $('.layer,.icon-box').css('display', 'none');
    $('.container .pagelist .page6 .part-second').hide();
    $('.container .pagelist .page6 .part-first').css('display', 'block');
  });
  $('.container .pagelist .page6 .selectfile').on('click', function() {
    $('.container .pagelist .page6 .btn-group-first .open').hide();
  });



  //创建元素
  $('.container .pagelist .page6  .swiper-slide img').on('click', function() {
    var key = $(this).attr('class');
    var src = $(this).attr('src');
    var lpcDom = $("<div class='lpc'><img src='" + src + "' class='main-pic'/><img src='img/content-pic-close.png'/ class='close-pic'><img src='img/content-pic-rotate.png'/ class='rotate-pic'><img src='img/content-pic-zoom.png'/ class='zoom-pic'></div>")
    $('.container .pagelist .page6 .icon-box').append(lpcDom);
    // var element2 = document.querySelector('.icon-box');
    var element2 = lpcDom[0];
    console.log('element2' + element2);
    var $element2 = lpcDom;

    var loc = {
      x: 0,
      y: 0,
      offT: 0,
      offL: 0,
      scale: 1,
      w: $element2.width(),
      h: $element2.height(),
      photoWidth: lpcDom.width(),
      photoHeight: lpcDom.height(),
      initWidth: lpcDom.width(),
      initHeight: lpcDom.height()
    };



    var timer;
    // 对照片的移动等处理
    var hammertime = new Hammer(element2);
    var Rotate = new Hammer.Rotate();
    hammertime.add(Rotate);
    hammertime.on('rotate', function(e) {

      // do something cool
      var rotation = Math.round(e.rotation);
      lpcDom[0].style.transform = 'rotate(' + rotation + 'deg)';
    });
    hammertime.get('pan').set({
      direction: Hammer.DIRECTION_ALL
    });
    hammertime.get('pinch').set({
      enable: true
    });

    hammertime.on("pan", function(event) {
      lpcDom.css({
        left: loc.x + event.deltaX,
        top: loc.y + event.deltaY
      });
    });

    hammertime.on("panend", function(event) {
      loc.x = loc.x + event.deltaX;
      loc.y = loc.y + event.deltaY;
    });

    hammertime.on("pinch", function(event) {
      clearTimeout(timer);
      hammertime.get('pan').set({
        enable: false
      });
      var scale = parseFloat(event.scale.toFixed(2));
      var w, h;
      lpcDom.css({
        width: loc.photoWidth * scale,
        height: loc.photoHeight * scale,
        left: loc.x - (loc.photoWidth * scale - loc.photoWidth) / 2,
        top: loc.y - (loc.photoHeight * scale - loc.photoHeight) / 2
      });

    });

    hammertime.on("pinchend", function(event) {
      var scale = event.scale.toFixed(2);
      loc.x = loc.x - (loc.photoWidth * scale - loc.photoWidth) / 2;
      loc.y = loc.y - (loc.photoHeight * scale - loc.photoHeight) / 2;
      loc.photoWidth = loc.photoWidth * scale;
      loc.photoHeight = loc.photoHeight * scale;

      timer = setTimeout(function() {
        hammertime.get('pan').set({
          enable: true
        });
      }, 500);
    });
  });

  $('.page6 .icon-box').on('click', '.close-pic', function() {
    $(this).parent().remove();
  });

  //随机生成匹配度
  var pos_array = new Array();
  pos_array[3] = '80';
  pos_array[1] = '85';
  pos_array[2] = '90';
  pos_array[0] = '95';

  function get_pos() {
    pos_array.sort(
      function() {
        return 0.5 - Math.random();
      }
    );
    return pos_array;
  }
  pos_array = get_pos();
  $('.container .pagelist .page8 .progress > span').css('width', '' + pos_array[1] + '%');
  $('.container .pagelist .page8 .progress .rate').text(pos_array[1]);



  function print() {
    $('.page6 .content').addClass('ctn-hide');
    var dom = $(".content");
    var width = dom.width();
    var height = dom.height();
    var type = "png";
    var scaleBy = 5; // 缩放比例
    var canvas = document.createElement('canvas');
    canvas.width = width * scaleBy + 100;
    canvas.height = height * scaleBy + 100; // 60 是我处理完后发现短了一点，具体为什么不清楚，如果你也少的话，根据自己的项目调吧
    canvas.style.width = width * scaleBy + 'px';
    canvas.style.height = height * scaleBy + 'px';
    var context = canvas.getContext('2d');
    context.scale(scaleBy, scaleBy);
    html2canvas(dom[0], {
      canvas: canvas,
      onrendered: function(canvas) {

        $('.result-img').attr('src', canvas.toDataURL());
        pagelist.pagesBox('goNext');
        $('.page6 .content').removeClass('ctn-hide');
      }
    });
  }



  //音频
  $(".music-btn").on("click", function(event) {
    if ($(this).hasClass("mute")) {
      music.play();
      $(this).removeClass("mute");
    } else {
      music.pause();
      $(this).addClass("mute");
    }
  });

});