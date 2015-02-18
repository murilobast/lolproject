var data = {name: '',server: '', sid: ''};
var matchHistory = new Object();
var ranked = new Object();
var mainHost = 'http://gankei-backend.herokuapp.com'
//var mainHost = 'http://localhost:3000'
var games = [];
var team = [];
var sidList1;
var sidList2;
var sidList3;
var extra = [];
$(function(){
    resizeWindow();
    hideAllBut($('#Home'), 200);
    $(window).resize(function(){ resizeWindow(); });
    $('.linkHome').click(function(event){
        event.preventDefault();
        hideAllBut($('#Home'));
    });
});

$(function(){
    $('.send').click(function(event){
        event.preventDefault();
        data.name = noAcentos($('.name').val().replace(/ /g,'').toLowerCase());
        data.server = $('.serverOpt').val();
        team = [];
        sidList1 = undefined;
        sidList2 = undefined;
        sidList3 = undefined;
        $('.players').show();
        $('.name').val('');
        //Basic Summoner Info
        ajaxLoL(basicInfoURL(data.server, data.name), function(result){
            var summonerInfos = result;
            data.sid = result[data.name].id;
            $('.basicInfo .outName').text(result[data.name].name);
            $('.outLevel').text('Level ' + result[data.name].summonerLevel);
            $('.outIcon').attr('src', imageDb(data.ver, 'profileicon', result[data.name].profileIconId));
            if ($('.tgl').is(':checked')){
                activeMatch();
            }else{
                basicInfo();
            };
        });
    });        
});