$(document).ready(function () {

    var timer;
    $('.scroll').on('DOMMouseScroll mousewheel', function (event) {
        if(timer) {
            window.clearTimeout(timer);
        }
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
        timer = window.setTimeout(function() {
            scroll(delta)
        }, 300);
    });
});

function scroll(scroll){
    var to = $('body').scrollTop() - $(window).height();
    console.log('scrolltop '+ $('body').scrollTop() +' dlina '+ $('body').scrollTop());
    if(scroll<0){ //to top
        $('body').animate({scrollTop: $('body').scrollTop() + $(window).height()},300);
    }else{ //to down
        $('body').animate({scrollTop: $('body').scrollTop() - $(window).height()},300);
    }
}