function activeMatch(event){
    //event.preventDefault();
    hideAllBut($('#Active'), 200);
    ajaxLoL('https://br.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/BR1/1304498?api_key=a0797630-9996-4ab6-85d6-704029984adf', function(result){
        console.log(result.participants);
        
        jQuery.each(result.participants, function(player){
        
            var playerName = result.participants[player].summonerName;
            var spell1 = result.participants[player].spell1Id;
            var spell2 = result.participants[player].spell2Id;
            if (player < 5){

                console.log('blue');
                $('.outBluePlayer:eq(' + player + ')').text(playerName);
                $('.player:eq(' + player + ') .outSpell1').attr('src', 'spell/' + spell1 + '.png');
                $('.player:eq(' + player + ') .outSpell2').attr('src', 'spell/' + spell2 + '.png');

            };

            if (player > 4){

                console.log('purple');
                $('.outPurplePlayer:eq(' + [player-5] + ')').text(playerName);
                $('.player:eq(' + player + ') .outSpell1').attr('src', 'spell/' + spell1 + '.png');
                $('.player:eq(' + player + ') .outSpell2').attr('src', 'spell/' + spell2 + '.png');
            };
            
        })
    }, 'activematch');  
};