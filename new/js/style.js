$(window).scroll(function() {
if ($(this).scrollTop() > 200){  
    $('.header').addClass("fixed");
    $('.content').css("margin-top", '240px');
  }
  else{
    $('.header').removeClass("fixed");
    $('.content').css("margin-top", '410px');
  }
});