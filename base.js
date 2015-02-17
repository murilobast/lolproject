var data = {name: '',server: '', sid: ''};
var matchHistory = new Object();
var ranked = new Object();
var mainHost = 'http://gankei-backend.herokuapp.com'
var games = [];
var team = [];
var sidList1;
var sidList2;
var sidList3 = 431005;

$(function(){
    resizeWindow();
    hideAllBut($('#Active'), 200);
    $(window).resize(function(){ resizeWindow(); });
    $('.linkHome').click(function(event){
        event.preventDefault();
        hideAllBut($('#Home'));
    });
});