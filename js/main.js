$(document).ready(function () {
    var clients_from_width=1000;
    resize();
    $(window).resize(function () {
        resize();
    });
    function resize() {
        var width=$(window).width();
        if(width<clients_from_width ){
            var test=Math.floor(width*100/clients_from_width);
            var scale='0.'+test;
            $('.clients').css('transform','scale('+ scale +')')
        }
    }




    var slides = $('.showcase').children();//find all children(slides)
    var cnt_slide = slides.length;
    var canExe = true;
    var fruits = ["images/photo/main", "images/photo/main1", "images/photo/main4", "images/photo/main5", "images/photo/main6"];
    var randomImg=fruits[getRandomInt(0,fruits.length-1)]+'.jpg';

    $('.showcase :first').css('background-image','url('+ randomImg +')');
    slides.each(function (index, element) {
        $(element).css('z-index', cnt_slide - index);
        $('.showcase-pagination').append('<div class="dot" data-count="' + index + '"></div>');
    });

    $('.showcase-pagination :first-child').addClass('active');

    $('.dot').on('click', function () {
        $this = $(this);
        var goNum = Number($this.attr('data-count'));
        changeDot(goNum);
    });


    $('.main-div').on('DOMMouseScroll mousewheel', function (event) {
       //DOMMouseScroll-for firefox;mousewheel-other;
        event = event || window.event;
        event.preventDefault();
        var delta ;
        if (event.originalEvent.wheelDelta) {
            // IE, Opera, safari, chrome - кратность дельта равна 120
            delta = event.originalEvent.wheelDelta/120;
        } else if (event.detail) {
            // Mozilla, кратность дельта равна 3
            delta = event.detail/-3;
        }
        if (canExe) {
            if (delta < 0) { //scroll down
                changeDot('down');
            } else { //scroll up
                changeDot('up');
            }
            canExe = false;
            setTimeout(function () {
                canExe = true
            }, 500);
        }
    });


    function changeDot(goNum) {
        var active = $(".dot.active");
        var g = Number(active.attr('data-count'));
        if (goNum == 'up' && active.prev().length > 0) {
            --g;
        }
        else if (goNum == 'down' && active.next().length > 0) {
            ++g;
        }
        else if ($.isNumeric(goNum)) {
            g = goNum;
        } else {
            return false;
        }
        active.removeClass("active");
        $(".dot").eq(g).addClass('active');
        changeSlide(g);
    }

    function changeSlide(num) {
        slides.removeClass('active old');
        slides.each(function (index, element) {
            if (index === num) {
                $(element).addClass('active');
                return false;
            }
            $(element).addClass('old');
        });
        //add function
        if(num==1){
            $('.clients *').addClass('animated zoomIn');
                setTimeout(function () {
                    $('.clients *').removeClass('animated zoomIn');
                },1000)
        }
    }

    function getRandomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    $('.arrow-down').on('click',function () {
        changeDot('down');
    });

});