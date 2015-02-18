function basicInfo(){
    //hideAllBut($('#Home'));
    //Ranked Info
    ajaxLoL(rankedURL(data.server, data.sid), function(result){
        $('.solo .outTier').text(result[data.sid][0].tier + ' ' + result[data.sid][0].entries[0].division);
        $('.solo .outTierImg').attr('src', 'tier/' + result[data.sid][0].tier + '_' + result[data.sid][0].entries[0].division+ '.png');
        $('.solo .outLP').text(result[data.sid][0].entries[0].leaguePoints + ' LP');
        var totalLP = 0;
        var tier = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MASTER', 'CHALLENGER'];
        var division = ['V', 'IV', 'III', 'II', 'I'];
        console.log(result[data.sid][0].tier);
        if (result[data.sid][0].tier == 'CHALLENGER') {
            totalLP = 2600;
        }else if (result[data.sid][0].tier == 'MASTER') {
            totalLP = 2500;
        }else{          
            jQuery.each(tier, function(i){
                if (result[data.sid][0].tier == tier[i]){
                    totalLP = i*500;
                };
            });
            jQuery.each(division, function(i){
                if (result[data.sid][0].entries[0].division == division[i]){
                    totalLP = totalLP+(i*100);
                };
            });
        };
        $('.solo .outElo').text(totalLP + (parseInt(result[data.sid][0].entries[0].leaguePoints) ) + ' Total LP');
    }, 'ranked');

    //Match History
    ajaxLoL(matchHistoryURL(data.server, data.sid), function(result) {
        matchHistory = result; 
        jQuery.each(matchHistory.games, function(game){
            extra.push({player: []});
            if (result.games[game].subType == 'BOT') {
                $('.outEnemyMembers:eq(' + game + ') .player').hide();
                jQuery.each(result.games[game].fellowPlayers, function(player){
                    extra[game].player.push({champId: '0', sid: '0', name: '-'});
                    extra[game].player[player].champId= result.games[game].fellowPlayers[player].championId;
                    extra[game].player[player].sid= result.games[game].fellowPlayers[player].summonerId;
                });
            }else if (result.games[game].subType == 'NONE'){
                $('.players:eq(' + game + ')').children('div').hide();
            }else{
                games[game] = result.games[game].fellowPlayers;
            };
            team.push({blue: [], purple: []});
            if (games[game] == undefined){
            }else{
                if (result.games[game].teamId == 100) {
                    for (slot=0;slot<5;slot++) {
                        team[game].blue.push({champId: '0', sid: '0', name: '-'});
                        team[game].purple.push({champId: '0', sid: '0', name: '-'});
                    };
                    var blue = 1;
                    var purple = 0;
                    team[game].blue[0].sid = data.sid;
                    team[game].blue[0].champId = result.games[game].championId;
                    jQuery.each(games[game], function(player){
                        if (games[game][player].teamId == 100) {
                            team[game].blue[blue].champId = result.games[game].fellowPlayers[player].championId;
                            team[game].blue[blue].sid = result.games[game].fellowPlayers[player].summonerId;
                            blue++;
                        }else{
                            team[game].purple[purple].champId = result.games[game].fellowPlayers[player].championId;
                            team[game].purple[purple].sid = result.games[game].fellowPlayers[player].summonerId;
                            purple++;
                        };
                    });
                }else{
                    for (slot=0;slot<5;slot++) {
                        team[game].blue.push({champId: '0', sid: '0', name: '-'});
                        team[game].purple.push({champId: '0', sid: '0', name: '-'});
                    };
                    var blue = 1;
                    var purple = 0;
                    team[game].blue[0].sid = data.sid;
                    team[game].blue[0].name = data.name;
                    team[game].blue[0].champId = result.games[game].championId;
                    jQuery.each(games[game], function(player){
                        if (games[game][player].teamId == 200) {
                            team[game].blue[blue].champId = result.games[game].fellowPlayers[player].championId;
                            team[game].blue[blue].sid = result.games[game].fellowPlayers[player].summonerId;
                            blue++;
                        }else{
                            team[game].purple[purple].champId = result.games[game].fellowPlayers[player].championId;
                            team[game].purple[purple].sid = result.games[game].fellowPlayers[player].summonerId;
                            purple++;
                        };
                    });
                };
                jQuery.each(team[game].blue, function(player){
                    if (game < 8){
                        if (game == 0){
                            if (player == 0 ) {
                                sidList1 =  data.sid;
                                sidList1 =  team[game].blue[player].sid;
                            }else{
                                sidList1 =  sidList1 + ',' + team[game].blue[player].sid;  
                            };
                        }else{
                            sidList1 =  sidList1 + ',' + team[game].blue[player].sid;  
                        };
                    };
                    if (game < 8){
                        if (game == 0){
                            if (player == 0 ) {
                                sidList2 =  data.sid;
                                sidList2 =  team[game].purple[player].sid;
                            }else{
                                sidList2 =  sidList2 + ',' + team[game].purple[player].sid;  
                            };
                        }else{
                            sidList2 =  sidList2 + ',' + team[game].purple[player].sid;  
                        };
                    }; 
                    if (game > 7){
                        if (game == 7){
                            if (player == 0 ) {
                                sidList3 =  data.sid;
                                sidList3 =  team[game].blue[player].sid;
                                sidList3 =  sidList3 + ',' + team[game].purple[player].sid; 
                            }else{
                                sidList3 =  sidList3 + ',' + team[game].blue[player].sid;  
                                sidList3 =  sidList3 + ',' + team[game].purple[player].sid; 
                            };
                        }else{
                            sidList3 =  sidList3 + ',' + team[game].blue[player].sid;  
                            sidList3 =  sidList3 + ',' + team[game].purple[player].sid; 
                        };
                    };
                });
            };
            
            if (sidList1 == undefined) {
                sidList1 = data.sid;
            }
            if (sidList2 == undefined) {
                sidList2 = data.sid;
            }
            if (sidList3 == undefined) {
                sidList3 = data.sid;
            }

            when = new Date(matchHistory.games[game].createDate);
            var duration = parseInt(matchHistory.games[game].stats.timePlayed/60);
            $('.outDuration:eq(' + game + ')').text(duration + 'min');
            $('.outDate:eq(' + game + ')').text(timeSince(when));
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
            $('.outGameType:eq(' + game + ')').text((matchHistory.games[game].subType).replace(/_/g,' '));
            $('.outCreeps:eq(' + game + ')').text(matchHistory.games[game].stats.minionsKilled);
            $('.outSummonerSpell1:eq(' + game + ')').attr('src', 'spell/' + matchHistory.games[game].spell1 + '.png');
            $('.outSummonerSpell2:eq(' + game + ')').attr('src', 'spell/' + matchHistory.games[game].spell2 + '.png');
            if(matchHistory.games[game].stats.win == true) {
               $('.matchHistory .content:eq(' + game + ')').css('background', 'rgba(26,188,156,0.45)');
            }else if (matchHistory.games[game].stats.win == false) {
                $('.matchHistory .content:eq(' + game + ')').css('background', 'rgba(231, 76, 60, 0.45)');
            }else{
                $('.matchHistory .content:eq(' + game + ')').css('background', '#52B3D9');
            };                   
            i++;
        });

        ajaxLoL(summonerNamesURL(data.server, sidList1), function(result){
            jQuery.each(result, function(id){
                jQuery.each(team, function(game){
                   jQuery.each(team[game].blue, function(bluePlayer){
                       if (result[id].id == team[game].blue[bluePlayer].sid){
                           team[game].blue[bluePlayer].name = result[id].name;
                           $('.players:eq(' + game + ') .outName:eq(' + bluePlayer + ')').text(team[game].blue[bluePlayer].name);
                       };
                   });
                });
            });
        });

        ajaxLoL(summonerNamesURL(data.server, sidList2), function(result){
            jQuery.each(result, function(id){
                jQuery.each(team, function(game){
                   jQuery.each(team[game].purple, function(purplePlayer){
                       if (result[id].id == team[game].purple[purplePlayer].sid){
                           team[game].purple[purplePlayer].name = result[id].name;
                           $('.players:eq(' + game + ') .outName:eq(' + [purplePlayer+5] + ')').text(team[game].purple[purplePlayer].name);
                       };
                   });
                });
            });
        });

        ajaxLoL(summonerNamesURL(data.server, sidList3), function(result){
            jQuery.each(result, function(id){
                jQuery.each(team, function(game){
                    if (game > 7){
                        jQuery.each(team[game].purple, function(purplePlayer){
                            if (result[id].id == team[game].purple[purplePlayer].sid){
                               team[game].purple[purplePlayer].name = result[id].name;
                               $('.players:eq(' + game + ') .outName:eq(' + [purplePlayer+5] + ')').text(team[game].purple[purplePlayer].name);
                            };
                        });
                        jQuery.each(team[game].blue, function(bluePlayer){
                            if (result[id].id == team[game].blue[bluePlayer].sid){
                                team[game].blue[bluePlayer].name = result[id].name;
                                $('.players:eq(' + game + ') .outName:eq(' + bluePlayer + ')').text(team[game].blue[bluePlayer].name);
                            };
                        });
                   };
                });
            });
        });

        //Champion Info
        ajaxLoL(championInfoURL(data.server), function(result) {
            jQuery.each(matchHistory.games, function(game){
                var championName = result.data[matchHistory.games[game].championId].key;
                $('.outChamp:eq(' + game + ')').attr('src', imageDb(data.ver, 'champion', championName));
                $('.outChampionName:eq(' + game + ')').text(championName);
                $('.matchHistory .match:eq(' + game + ')').css('background', 'url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' + championName + '_0.jpg)');
                jQuery.each(matchHistory.games[game].fellowPlayers, function(player) {
                    jQuery.each(team[game].blue, function(bluePlayer){
                        var championTeamName = result.data[team[game].blue[bluePlayer].champId].key;
                        $('.players:eq(' + game + ') .outChampTeam:eq(' + [bluePlayer] + ')').attr('src', imageDb(data.ver, 'champion', championTeamName));
                    });
                    jQuery.each(team[game].purple, function(purplePlayer){
                        var championTeamName = result.data[team[game].purple[purplePlayer].champId].key;
                        $('.players:eq(' + game + ') .outChampTeam:eq(' + [purplePlayer+5] + ')').attr('src', imageDb(data.ver, 'champion', championTeamName));
                    });
                    if (typeof extra[game] != 'undefined'){
                        if (typeof extra[game].player != 'undefined'){
                            jQuery.each(extra[game].player, function(extraPlayer){
                                var championTeamName = result.data[extra[game].player[extraPlayer].champId].key;
                                $('.players:eq(' + game + ') .outChampTeam:eq(' + [extraPlayer] + ')').attr('src', imageDb(data.ver, 'champion', championTeamName));
                            });
                        };
                    };
               });                                     
            });
            hideAllBut($('.Result'), 200);
        }, 'championInfo');
    }, 'matchHistory');
};