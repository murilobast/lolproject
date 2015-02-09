var data = {name: 'name', sid: '0', server: 'srv', ver: 'ver'};
var static = {championId: '0', championName: 'champ', item: '0'};
$(document).ready(function(){    
    $(window).resize(function(){
        $('.Result .container, .matchHistory').css('height', $(window).height() - 202 + 'px');
    });
    
    
    $('.linkHome').click(function(event){
        event.preventDefault();
        $('#Home').show(100);
        $('.Result').hide();
    });
    //$('#Home').hide();
    $('.Result').hide();
    $('#Active').hide();
    $('.send').click(function(event){
        data.name = $('.name').val().replace(/ /g,'');
        data.server = $('.serverOpt').val();
        event.preventDefault();
        if ($('.tgl').is(":checked"))
        {
            $('#Home').hide(100);
            $('.Result').hide(100);
            $.ajax({
                url: 'https://' + data.server + '.api.pvp.net/api/lol/' + data.server + '/v1.4/summoner/by-name/' + data.name + '?api_key=a0797630-9996-4ab6-85d6-704029984adf',
                beforeSend: function() { $('body').addClass("loading"); },
                complete: function() { $('body').removeClass("loading"); },
                dataType: 'json',
                success : function(retorno) {
                data.sid = retorno[data.name].id; 
                 //LIVE GAMES RIOT API
                $.ajax({
                    url: 'https://' + data.server + '.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/' + data.server.toLocaleUpperCase() + '1/' + data.sid + '?api_key=a0797630-9996-4ab6-85d6-704029984adf',         
                    success: function(response) {
                        $('#Active').show(100);
                        console.log(response.participants[0]);

                        jQuery.each($('.outFriendTeam'), function(i){

                            $('.outFriendTeam:eq(' + i + ')').text(response.participants[i].summonerName);
                        })
                        jQuery.each($('.outEnemyTeam'), function(i){

                            $('.outEnemyTeam:eq(' + i + ')').text(response.participants[i+5].summonerName);
                        })

                    }
                });
               }
            });
        }else{      
            $('.solo .outElo').text('0 Points');
            resizeWindow();
            $('#Home').hide(100);
            $('.Result').hide();
            $('.outLP').text(0);
            // BASIC INFO RIOT API
            $.ajax({
                url: 'https://' + data.server + '.api.pvp.net/api/lol/' + data.server + '/v1.4/summoner/by-name/' + data.name + '?api_key=a0797630-9996-4ab6-85d6-704029984adf',
                beforeSend: function() { $('body').addClass("loading"); },
                complete: function() { $('body').removeClass("loading"); },
                dataType: 'json',
                success : function(retorno) {
                    $('.outName').text(retorno[data.name].name);
                    $('.outLevel').text('Level: ' + retorno[data.name].summonerLevel);
                    $('.outIcon').attr('src', 'http://ddragon.leagueoflegends.com/cdn/' + data.ver + '/img/profileicon/' + retorno[data.name].profileIconId + '.png');
                    data.sid = retorno[data.name].id;
                    //RANKED GAMES RIOT API
                    $.ajax({
                        url: 'https://na.api.pvp.net/api/lol/' + data.server + '/v2.5/league/by-summoner/' + data.sid + '/entry?api_key=a0797630-9996-4ab6-85d6-704029984adf',
                        beforeSend: function() { $('body').addClass("loading"); },
                        complete: function() { $('body').removeClass("loading"); },
                        dataType: 'json',
                        success: function(retorno2){
                            $('.solo .outTier').text(retorno2[data.sid][0].tier + ' ' + retorno2[data.sid][0].entries[0].division);
                            $('.solo .outTierImg').attr('src', 'tier/' + retorno2[data.sid][0].tier + '_' + retorno2[data.sid][0].entries[0].division+ '.png');
                            $('.solo .outLP').text(retorno2[data.sid][0].entries[0].leaguePoints + ' LP');
                            var elo = 0;
                            var tier = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MASTER', 'CHALLENGER'];
                            var division = ['V', 'IV', 'III', 'II', 'I']
                            jQuery.each(tier, function(i){
                                if(retorno2[data.sid][0].tier == tier[i]){
                                    elo = ((i+1)*250)+800;
                                }
                                i++;
                            });
                            jQuery.each(division, function(i){
                                if(retorno2[data.sid][0].entries[0].division == division[i]){
                                    elo = elo + (i*50);
                                }
                                i++;
                            });
                            $('.solo .outElo').text(elo + (parseInt(retorno2[data.sid][0].entries[0].leaguePoints / 2) ) + ' Points');
                        }
                    })
                    //MATCH HISTORY RIOT API
                    $.ajax({
                        url: 'https://na.api.pvp.net/api/lol/' + data.server + '/v1.3/game/by-summoner/' + data.sid + '/recent?api_key=a0797630-9996-4ab6-85d6-704029984adf',
                        beforeSend: function() { $('body').addClass("loading"); },
                        complete: function() { $('body').removeClass("loading"); },
                        dataType: 'json',
                        success: function(response) {
                            //console.log(response.games[0]);
                            jQuery.each(response.games, function(game){
                                date = new Date(response.games[game].createDate);
                                $('.outDate:eq(' + game + ')').text(('0' + date.getDate()).slice(-2) + '/' + ('0' + date.getMonth() +1).slice(-2) + '/' + date.getFullYear());
                                static.championId = response.games[game].championId;
                                var item = [1, 2, 3, 4, 5, 6, 7];
                                for (var i = 0; i < 7; i++) {
                                    item[i] = response.games[game].stats['item' + i];
                                    if (response.games[game].stats['item' + i]){
                                        if (response.games[game].stats['item' + i] == 3128 || 3160){
                                            $('.outItem' + i + ':eq(' + game + ')').attr('src', 'http://ddragon.leagueoflegends.com/cdn/4.21.1/img/item/' + item[i] + '.png');
                                        }else{                                        
                                            $('.outItem' + i + ':eq(' + game + ')').attr('src', 'http://ddragon.leagueoflegends.com/cdn/' + data.ver + '/img/item/' + item[i] + '.png');
                                        }
                                    }
                                };
                                $('.outK:eq(' + game + ')').text(('0' + (parseInt(response.games[game].stats.championsKilled) || 0)).slice(-2));
                                $('.outD:eq(' + game + ')').text(('0' + (parseInt(response.games[game].stats.numDeaths) || 0)).slice(-2));
                                $('.outA:eq(' + game + ')').text(('0' + (parseInt(response.games[game].stats.assists) || 0)).slice(-2));
                                $('.outGold:eq(' + game + ')').text(('0' + (parseInt(response.games[game].stats.goldEarned / 1000) || 0)).slice(-2) + 'K Gold');
                                $('.outGameType:eq(' + game + ')').text(response.games[game].gameMode);
                                $('.outCreeps:eq(' + game + ')').text(response.games[game].stats.minionsKilled);
                                $('.outSummonerSpell1:eq(' + game + ')').attr('src', 'spell/' + response.games[game].spell1 + '.png');
                                $('.outSummonerSpell2:eq(' + game + ')').attr('src', 'spell/' + response.games[game].spell2 + '.png');
                                if(response.games[game].stats.win == true) {
                                   $('.matchHistory .content:eq(' + game + ')').css('background', '#03C9A9');
                                }else if (response.games[game].stats.win == false) {
                                    $('.matchHistory .content:eq(' + game + ')').css('background', '#EF4836 ');
                                }else{
                                    $('.matchHistory .content:eq(' + game + ')').css('background', '#52B3D9');
                                };
                                //CHAMPION INFO RIOT API
                                $.ajax({
                                    url: 'https://na.api.pvp.net/api/lol/static-data/' + data.server + '/v1.2/champion/' + static.championId + '?api_key=a0797630-9996-4ab6-85d6-704029984adf',
                                    dataType: 'json',
                                    success: function(response) {
                                        static.championName = response.key;
                                        $('.outChamp:eq(' + game + ')').attr('src', 'http://ddragon.leagueoflegends.com/cdn/' + data.ver + '/img/champion/' + static.championName + '.png');
                                        $('.outChampionName:eq(' + game + ')').text(static.championName);
                                    }
                                });                    
                                i++;
                            });
                        }                        
                    });

                    if ($(".outTier").empty){
                        $('.outTier').text('Unranked');
                        $('.outTierImg').attr('src', 'tier/unranked.png');
                    }
                    setTimeout(function(){
                        $('.Result').show(100);
                    }, 600);
                }   
            });
        }
    });
});

//Extra Functions
$(function(){
    $.ajax({
        url: 'https://br.api.pvp.net/api/lol/static-data/br/v1.2/versions?api_key=a0797630-9996-4ab6-85d6-704029984adf',
        beforeSend: function() { $('body').addClass("loading"); },
        complete: function() { $('body').removeClass("loading"); },
        dataType: 'json',
        success: function(response) {
            data.ver = response[0];
            console.log(response[0]);
        }
    });
});
 jQuery.fn.clickToggle = function(a,b) {
  var ab=[b,a];
  function cb(){ ab[this._tog^=1].call(this); }
  return this.on("click", cb);
};

resizeWindow = (function(){
    $('.Result .container, .matchHistory').css('height', $(window).height() - 202 + 'px');
});


//Cross Domain Ajax fix
$.ajaxPrefilter(function(options) {
  if(options.crossDomain && jQuery.support.cors) {
    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    //options.url = "http://cors.corsproxy.io/url=" + options.url;
  }
});