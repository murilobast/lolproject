var data = {name: '',server: '', sid: ''};
var matchHistory = new Object();
var ranked = new Object();
$(function(){
    resizeWindow();
    hideAllBut($('#Home'));
    $(window).resize(function(){ resizeWindow(); });
    $('.linkHome').click(function(event){
        event.preventDefault();
        hideAllBut($('#Home'));
    });
});