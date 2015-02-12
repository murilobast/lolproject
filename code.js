$(function(){
    $('.send').click(function(event){
        hideAllBut($('.Result'));
        event.preventDefault();
        data.name = noAcentos($('.name').val().replace(/ /g,'').toLowerCase());
        data.server = $('.serverOpt').val();
        //Basic Summoner Info
        ajaxLoL(basicInfoURL(data.server, data.name), function(result){
            data.sid = result[data.name].id;
            $('.basicInfo .outName').text(result[data.name].name);
            $('.outLevel').text('Level ' + result[data.name].summonerLevel);
            
            //Ranked Info
            ajaxLoL(rankedURL(data.server, data.sid), function(result){
                $('.solo .outTier').text(result[data.sid][0].tier + ' ' + result[data.sid][0].entries[0].division);
                $('.solo .outTierImg').attr('src', 'tier/' + result[data.sid][0].tier + '_' + result[data.sid][0].entries[0].division+ '.png');
                $('.solo .outLP').text(result[data.sid][0].entries[0].leaguePoints + ' LP');
                var elo = 0;
                var tier = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MASTER', 'CHALLENGER'];
                var division = ['V', 'IV', 'III', 'II', 'I']
                jQuery.each(tier, function(i){
                    if(result[data.sid][0].tier == tier[i]){
                        elo = ((i+1)*200)+900;
                    };
                    i++;
                });
                jQuery.each(division, function(i){
                    if(result[data.sid][0].entries[0].division == division[i]){
                        elo = elo + (i*40);
                    };
                    i++;
                });
                $('.solo .outElo').text(elo + (parseInt(result[data.sid][0].entries[0].leaguePoints / 2) ) + ' Points');
            }, 'ranked');
            
            //Match History
            ajaxLoL(matchHistoryURL(data.server, data.sid), function(result) {
                matchHistory = result;
                console.log(matchHistory.games);                
                
                jQuery.each(matchHistory.games, function(game){
                    date = new Date(matchHistory.games[game].createDate);
                    //$('.outDate:eq(' + game + ')').text(('0' + date.getDate()).slice(-2) + '/' + ('0' + date.getMonth() +1).slice(-2) + '/' + date.getFullYear());
                    $('.outDate:eq(' + game + ')').text(timeSince(date));
                    var item = [1, 2, 3, 4, 5, 6, 7];
                    for (var i = 0; i < 7; i++) {
                        item[i] = matchHistory.games[game].stats['item' + i];
                        if (matchHistory.games[game].stats['item' + i]){
                            if (matchHistory.games[game].stats['item' + i] == 3128 || 3160){
                                $('.outItem' + i + ':eq(' + game + ')').attr('src', imageDb('4.21.1', 'item', item[i]));
                            }else{                                        
                                $('.outItem' + i + ':eq(' + game + ')').attr('src', imageDb(data.ver,+ 'tem', item[i]));
                            };
                        };
                    };                   
                    $('.outK:eq(' + game + ')').text(('0' + (parseInt(matchHistory.games[game].stats.championsKilled) || 0)).slice(-2));
                    $('.outD:eq(' + game + ')').text(('0' + (parseInt(matchHistory.games[game].stats.numDeaths) || 0)).slice(-2));
                    $('.outA:eq(' + game + ')').text(('0' + (parseInt(matchHistory.games[game].stats.assists) || 0)).slice(-2));
                    $('.outGold:eq(' + game + ')').text(('0' + (parseInt(matchHistory.games[game].stats.goldEarned / 1000) || 0)).slice(-2) + 'K GGOLD');
                    $('.outGameType:eq(' + game + ')').text(matchHistory.games[game].gameMode);
                    $('.outCreeps:eq(' + game + ')').text(matchHistory.games[game].stats.minionsKilled);
                    $('.outSummonerSpell1:eq(' + game + ')').attr('src', 'spell/' + matchHistory.games[game].spell1 + '.png');
                    $('.outSummonerSpell2:eq(' + game + ')').attr('src', 'spell/' + matchHistory.games[game].spell2 + '.png');
                    if(matchHistory.games[game].stats.win == true) {
                       $('.matchHistory .content:eq(' + game + ')').css('background', '#03C9A9');
                    }else if (matchHistory.games[game].stats.win == false) {
                        $('.matchHistory .content:eq(' + game + ')').css('background', '#EF4836 ');
                    }else{
                        $('.matchHistory .content:eq(' + game + ')').css('background', '#52B3D9');
                    };                   
                    i++;
                    
                });
                //Champion Info
                ajaxLoL(championInfoURL(data.server), function(result) {
                    jQuery.each(matchHistory.games, function(game){
                        var championName = result.data[matchHistory.games[game].championId].key;
                        $('.outChamp:eq(' + game + ')').attr('src', imageDb(data.ver, 'champion', championName));
                        $('.players:eq(' + game + ') .outChampTeam:eq(0)').attr('src', imageDb(data.ver, 'champion', championName));
                        $('.outChampionName:eq(' + game + ')').text(championName);
                        jQuery.each(matchHistory.games[game].fellowPlayers, function(player) {
                                var championTeamName = result.data[matchHistory.games[game].fellowPlayers[player].championId].key;
                                $('.players:eq(' + game + ') .outChampTeam:eq(' + [player+1] + ')').attr('src', imageDb(data.ver, 'champion', championTeamName));
                       });                                     
                    });
                }, 'championInfo');
            }, 'matchHistory');
        });
        if ($(".outTier").empty){
            $('.outTier').text('UNRANKED');
            $('.outTierImg').attr('src', 'tier/unranked.png');
        };
    });
});