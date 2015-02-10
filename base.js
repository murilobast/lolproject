$(function(){
    resizeWindow();
    hideAllBut($('#Home'));
    $(window).resize(function(){ resizeWindow(); });
    $('.linkHome').click(function(event){
        event.preventDefault();
        hideAllBut($('#Home'));
    });
});