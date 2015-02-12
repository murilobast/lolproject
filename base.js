var data = {name: '',server: '', sid: ''};
var matchHistory = new Object();
var ranked = new Object();
var apiKey = 'a0797630-9996-4ab6-85d6-704029984adf';
var fellow = new Object;
$(function(){
    resizeWindow();
    hideAllBut($('#Home'));
    $(window).resize(function(){ resizeWindow(); });
    $('.linkHome').click(function(event){
        event.preventDefault();
        hideAllBut($('#Home'));
    });
});