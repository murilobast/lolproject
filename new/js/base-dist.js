var data={name:"",server:"",sid:""};data.ver="5.3.1";var matchHistory=new Object,ranked=new Object,items=new Object,runes=new Object,championsData=new Object,mainHost="http://gankei-backend.herokuapp.com",totalSec=0,games=[],team=[],sidList1,sidList2,sidList3,sidList4,extra=[],interval,totalSec=0;$(function(){$(".reload").click(function(e){e.preventDefault(),$.jStorage.flush(),window.location="http://gankei.com/?key=1&server="+data.server+"&name="+data.name}),$(".headerNav a").click(function(){1==$(this).hasClass("history")&&0==$(this).hasClass("selected")&&($(".matchHistoryContent").css("display","block"),$("#ActiveMatch").css("display","none"),$(".headerNav a").removeClass("selected"),$(this).addClass("selected"),$(".reload").css("display","block")),1==$(this).hasClass("activeMatch")&&0==$(this).hasClass("selected")&&(clearInterval(interval),activeMatch())}),$(".share").click(function(){$(".modalShare").css("display","block"),$(".shareLink").val("http://gankei.com/?key=1&server="+data.server+"&name="+data.name),$("a.btn.facebook").prop("href","https://www.facebook.com/sharer/sharer.php?u=http://gankei.com/?key=1&server="+data.server+"&name="+data.name),$("a.btn.twitter").prop("href",'https://twitter.com/intent/tweet?url=URL&text="http://gankei.com/?key=1&server='+data.server+"&name="+data.name+'"')}),$(".close").click(function(){$(".modalShare").css("display","none")}),1==getUrlParameter("key")&&infoByUrl(),2==getUrlParameter("key")&&activeByUrl(),data.server=$(".serverOpt").val(),hideAllBut($(""),200),championData(),itemFloat(),getRunes(),$(".linkHome").click(function(e){e.preventDefault(),hideAllBut($("#Home"),200)}),$(".linkContact").click(function(e){e.preventDefault(),hideAllBut($("#Contact"),200)}),$(".linkAbout").click(function(e){e.preventDefault(),hideAllBut($("#About"),200)}),$(".send").click(function(e){totalSec=void 0,$(".matchHistoryContent").css("display","block"),$("#ActiveMatch").css("display","none"),$(".headerNav a").removeClass("selected"),$(".history").addClass("selected"),cleanUP(),hideAllBut($(""),300),$(".modalMsg").css("display","block"),$(".modalMsg p").text("carregando..."),e.preventDefault(),data.name=noAcentos($(".name").val().replace(/ /g,"").toLowerCase()),data.server=$(".serverOpt").val(),team=[],games=[],sidList1=void 0,sidList2=void 0,sidList3=void 0,sidList4=void 0,$(".player").show(),$(".name").val(""),getItems(),getRunes(),ajaxLoL(basicInfoURL(data.server,data.name),function(e){data.sid=e[data.name].id,$(".outName").text(e[data.name].name),$.each($(".players"),function(a){$(".players:eq("+a+") .outName").text(""),$(".players:eq("+a+") .outName:eq(0)").text(e[data.name].name)}),$(".outLevel").text("Level "+e[data.name].summonerLevel),$(".outIcon").attr("src",imageDb(data.ver,"profileicon",e[data.name].profileIconId)),$(".tgl").is(":checked")?activeMatch():basicInfo()},"basic")})});