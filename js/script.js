 $(function() {
   var music = document.getElementById("music");
   var loading = $('.loading-container');
   //加载图片列表
   var imgList = [
     'https://event.liepin.com/t/1493890496065/images/page1_bg.jpg',
     'https://event.liepin.com/t/1493890496065/images/page1_bbg.png',
     'https://event.liepin.com/t/1493890496065/images/page1_title1.png',
     'https://event.liepin.com/t/1493890496065/images/page1_title2.png',
     'https://event.liepin.com/t/1493890496065/images/page2_desc1.png',
     'https://event.liepin.com/t/1493890496065/images/arrow.png'

   ];
   var list = $('.container .pagelist').pagesBox({
     pages: 'section', //pages selector name
   });
   list.on("gopage", function(e, to, from) {
     $('section').eq(from).toggleClass('active');
     $('section').eq(to).toggleClass('active');
   });


   loading.css('display', 'none');
   $('section').eq(0).addClass('active');


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


   //打开相册
   $('.selectfile').on('change', function() {
     var oFile = document.querySelector('.selectfile').files[0];
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
         console.log(123);
         // $('.shape').css('display', 'none');
         $('.example').css('display', 'none');
         // $('.p4-btn').css('display', 'none');
         // $('.btn-block').css('display', 'block');
       }
     });
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
 });



 $('.page6 .btn-group .ele .main-btn').on('click', function() {
   $(this).parent().find('.checked').show().parent().siblings().find('.checked').hide();
   var now_role = $(this).attr('data-role');
   $('.content').attr('class', 'content content-' + now_role);
 });

 $('.container .pagelist .page9 .btn-group .details').on('click', function() {
   $('.container .pagelist .page9 .alert').show();
 })
 $('.container .pagelist .page9 .alert .close').on('click', function() {
   $('.container .pagelist .page9 .alert').hide();
 })
 $('.container .pagelist .page6 .part-first .sure').on('click', function() {
   $('.container .pagelist .page6 .part-first').hide();
   $('.container .pagelist .page6 .part-second').show();
 })
 $('.container .pagelist .page6 .part-second .rechoose').on('click', function() {
   $('.container .pagelist .page6 .part-second').hide();
   $('.container .pagelist .page6 .part-first').show();
 })
 $('.container .pagelist .page6 .selectfile').on('click', function() {
   $('.container .pagelist .page6 .btn-group-first .open').hide();
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


 //第七页滑动	
 window.onload = function() {
   var mySwiper = new Swiper('.swiper-container', {
     pagination: '.swiper-pagination',
     slidesPerView: 4,
     direction: 'horizontal',
     spaceBetween: 8,
     loop: true,

     // 如果需要前进后退按钮
     nextButton: '.swiper-button-next',
     prevButton: '.swiper-button-prev',

   })
 }

//音乐按钮事件
    // var NowState = 1;
    // alert('123');
    // $('.music-btn').click(function() {
    //   alert('123');
    //   var audio = document.getElementById('music-self');
    //   if (audio.paused) {
    //     audio.play();
    //     return;
    //     NowState = 1;
    //   }
    //   audio.pause();
    //   NowState = 0
    // });

