var data = {name: '',server: '', sid: ''};
var matchHistory = new Object();
var ranked = new Object();
var apiKey = 'a0797630-9996-4ab6-85d6-704029984adf';
var fellow = new Object;
var games = [];
var team = [];
var sidList1;
var sidList2;
var sidList3 = 431005;

$(function(){
    resizeWindow();
    hideAllBut($('#Home'));
    $(window).resize(function(){ resizeWindow(); });
    $('.linkHome').click(function(event){
        event.preventDefault();
        hideAllBut($('#Home'));
    });
});