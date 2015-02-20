var data = {name: '',server: '', sid: ''};
var matchHistory = new Object();
var ranked = new Object();
var items = new Object();
var mainHost = 'http://gankei-backend.herokuapp.com'
//var mainHost = 'http://localhost:3000'
var games = [];
var team = [];
var sidList1;
var sidList2;
var sidList3;
var sidList4;
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
    
    
    
    $('p').hide();
    $( ".test" ).keydown(function() {
        var re = new RegExp($( ".test" ).val());
        $.each($('p'), function(){       
            var exists = re.test($(this).text());;
            if (exists && $( ".test" ).val() != ''){
                console.log($( ".test" ).val());
                $(this).show();
            }else if ($( ".test" ).val() == ''){
                $('p').hide();
            }else{
                $(this).hide();
            };
        });
    });
    
    
    
    
    itemFloat();  
    $('.send').click(function(event){
        hideAllBut($('.modal'), 300);
        event.preventDefault();
        data.name = noAcentos($('.name').val().replace(/ /g,'').toLowerCase());
        data.server = $('.serverOpt').val();
        team = [];
        games = [];
        sidList1 = undefined;
        sidList2 = undefined;
        sidList3 = undefined;
        sidList4 = undefined;
        $('.player').show();
        $('.name').val('');
        getItems();
        
        //Basic Summoner Info
        ajaxLoL(basicInfoURL(data.server, data.name), function(result){
            var summonerInfos = result;
            data.sid = result[data.name].id;
            $('.basicInfo .outName').text(result[data.name].name);
            $.each($('.players'), function(game){
                $('.players:eq(' + game + ') .outName').text('');
                $('.players:eq(' + game + ') .outName:eq(0)').text(result[data.name].name);
            });
            $('.outLevel').text('Level ' + result[data.name].summonerLevel);
            $('.outIcon').attr('src', imageDb(data.ver, 'profileicon', result[data.name].profileIconId));
            if ($('.tgl').is(':checked')){
                //activeMatch();
            }else{
                basicInfo();
            };
        }, 'basic');
    });        
});