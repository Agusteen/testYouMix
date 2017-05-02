"use strict";angular.module("youMixApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/main/:urlList",{templateUrl:"views/main.html",controller:"youtubeCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/",{templateUrl:"views/inicio.html",controller:"InicioCtrl",controllerAs:"inicio"}).otherwise({redirectTo:"/"})}]),angular.module("youMixApp").controller("youtubeCtrl",["$scope","$routeParams","$location","youtubeEmbedUtils","youtubegetdata","$interval",function(a,b,c,d,e,f){a.flagMain=!1,a.flagLoading=!0,a.state=0,a.msg="Iniciando...",a.flagMsg=!0,a.msgAnimated=!0,a.titleNext,a.titleNow;var g=0;a.playerVars={list:b.urlList,controls:0,autoplay:1,iv_load_policy:3,disablekb:0,rel:0},a.stop=function(){a.state=0,c.path("/main/"),a=a.$new(!0)};var h=function(b){var c=d.getIdFromURL(b.getVideoUrl()),f=e.getTitle(c);f.then(function(b){a.titleNow=b})["catch"](function(a){console.log("No se pudo obtener el titulo del video")})};a.$on("youtube.player.playing",function(b,c){0===a.state?(a.playerSecond.stopVideo(),c.setVolume(100),a.playerSecond.playVideoAt(c.getPlaylistIndex()+1),a.prepareVideo(a.playerSecond),a.state=1,a.msgAnimated=!1,h(a.playerNow),k(a.playerNow)):1===a.state?(g++,1===a.playerSecond.getPlayerState()&&g>2&&i(a.playerSecond)):3===a.state?(g++,1===a.playerNow.getPlayerState()&&g>2&&i(a.playerNow)):(2===a.state||4===a.state)&&j()});var i=function(b){b.pauseVideo(),g>3&&(a.msgAnimated=!0,a.msg="¡Utilice el boton Siguiente para cambiar a esa canción!",setTimeout(function(){a.$apply(function(){a.msgAnimated=!1,a.forceNext=0})},5e3))};a.$on("youtube.player.error",function(){a.state=5,a.msgAnimated=!0,a.msg="¡Esos videos no funcionan aquí!"}),a.$on("youtube.player.ended",function(){if(0!==a.playerNow.getPlayerState()||a.flagLoading){if(0!==a.playerSecond.getPlayerState()||a.flagLoading)return;a.flagLoading=!0,a.endVideo(a.playerSecond,a.playerNow),a.state=1}else a.flagLoading=!0,a.endVideo(a.playerNow,a.playerSecond),a.state=3}),a.prepareVideo=function(b){function c(){b.setVolume(0),setTimeout(function(){b.pauseVideo(),-1===b.getPlayerState()||2===b.getPlayerState()?(b.setVolume(2),a.$apply(function(){a.flagLoading=!1})):c()},1500)}c()},a.crossfader=function(){g>2&&(g=0,a.msgAnimated=!1),g=0,1!==a.playerNow.getPlayerState()||a.flagLoading?1!==a.playerSecond.getPlayerState()||a.flagLoading?j():(a.flagLoading=!0,a.endVideo(a.playerSecond,a.playerNow,30,200),a.state=1):(a.flagLoading=!0,a.endVideo(a.playerNow,a.playerSecond,30,200),a.state=3)};var j=function(){if(g>2&&(g=0,a.msgAnimated=!1),g=0,2!==a.state||a.flagLoading){if(4!==a.state||a.flagLoading)return;a.flagLoading=!0,a.endVideo(a.playerSecond,a.playerNow,10,10),a.state=1}else a.flagLoading=!0,a.endVideo(a.playerNow,a.playerSecond,10,10),a.state=3},k=function(b){var c=f(function(){b.getCurrentTime()>=b.getDuration()-20&&(f.cancel(c),a.crossfader())},7e3)};a.playPause=function(){1===a.state?(a.playerNow.pauseVideo(),a.state=2):3===a.state?(a.playerSecond.pauseVideo(),a.state=4):2===a.state?(a.playerNow.playVideo(),a.state=1):4===a.state?(a.playerSecond.playVideo(),a.state=3):(a.playerNow.playVideo(),a.state=1)},a.startVideo=function(a,b){function c(){setTimeout(function(){a.setVolume(d),d+=5,d>2&&105>d&&c()},b)}a.playVideo();var d=a.getVolume();c()},a.endVideo=function(b,c,d,e){function f(){setTimeout(function(){b.setVolume(g),g-=5,g>2?f():(b.stopVideo(),a.flagMain?a.flagMain=!1:a.flagMain=!0,b.playVideoAt(c.getPlaylistIndex()+1),a.prepareVideo(b),h(c),k(c))},e)}var g=b.getVolume();a.startVideo(c,d),f()}}]),angular.module("youMixApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("youMixApp").directive("youtubeVideo",["$window","youtubeEmbedUtils",function(a,b){var c=1,d={"-1":"unstarted",0:"ended",1:"playing",2:"paused",3:"buffering",5:"queued"},e="youtube.player.";return a.YTConfig={host:"https://www.youtube.com"},{restrict:"EA",scope:{videoId:"=?",videoUrl:"=?",player:"=?",playerVars:"=?",playerHeight:"=?",playerWidth:"=?"},link:function(a,f,g){function h(){var b=Array.prototype.slice.call(arguments);a.$apply(function(){a.$emit.apply(a,b)})}function i(b){var c=d[b.data];"undefined"!=typeof c&&h(e+c,a.player,b),a.$apply(function(){a.player.currentState=c})}function j(b){h(e+"ready",a.player,b)}function k(b){h(e+"error",a.player,b)}function l(){var b=angular.copy(a.playerVars);b.start=b.start||a.urlStartTime;var c=new YT.Player(n,{height:a.playerHeight,width:a.playerWidth,videoId:a.videoId,playerVars:b,events:{onReady:j,onStateChange:i,onError:k}});return c.id=n,c}function m(){(a.videoId||a.playerVars.list)&&(a.player&&"function"==typeof a.player.destroy&&a.player.destroy(),a.player=l())}a.utils=b;var n=g.playerId||f[0].id||"unique-youtube-embed-id-"+c++;f[0].id=n,a.playerHeight=a.playerHeight||390,a.playerWidth=a.playerWidth||640,a.playerVars=a.playerVars||{};var o=a.$watch(function(){return a.utils.ready&&("undefined"!=typeof a.videoUrl||"undefined"!=typeof a.videoId||"undefined"!=typeof a.playerVars.list)},function(b){b&&(o(),"undefined"!=typeof a.videoUrl?a.$watch("videoUrl",function(b){a.videoId=a.utils.getIdFromURL(b),a.urlStartTime=a.utils.getTimeFromURL(b),m()}):"undefined"!=typeof a.videoId?a.$watch("videoId",function(){a.urlStartTime=null,m()}):a.$watch("playerVars.list",function(){a.urlStartTime=null,m()}))});a.$watchCollection(["playerHeight","playerWidth"],function(){a.player&&a.player.setSize(a.playerWidth,a.playerHeight)}),a.$on("$destroy",function(){a.player&&a.player.destroy()})}}}]),angular.module("youMixApp").service("youtubeEmbedUtils",["$window","$rootScope",function(a,b){function c(a,b){return a.indexOf(b)>-1}function d(){b.$apply(function(){e.ready=!0})}var e={},f=/https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi,g=/t=(\d+)[ms]?(\d+)?s?/;return e.getIdFromURL=function(a){var b=a.replace(f,"$1");if(c(b,";")){var d=b.split(";");if(c(d[1],"%")){var e=decodeURIComponent(d[1]);b=("http://youtube.com"+e).replace(f,"$1")}else b=d[0]}else c(b,"#")&&(b=b.split("#")[0]);return b},e.getIdListFromURL=function(a){if(c(a,"list=")){var b,d=a.split("list=");return c(d[1],"&")?(b=d[1].split("&"),b[0]):c(a,"#")?(b=d[1].split("#"),b[0]):d[1]}return-1},e.getTimeFromURL=function(a){a=a||"";var b=a.match(g);if(!b)return 0;var d=b[0],e=b[1],f=b[2];return"undefined"!=typeof f?(f=parseInt(f,10),e=parseInt(e,10)):c(d,"m")?(e=parseInt(e,10),f=0):(f=parseInt(e,10),e=0),f+60*e},e.ready=!1,"undefined"==typeof YT?(a.onYouTubeIframeAPIReady=d,console.log("Unable to find YouTube iframe library on this page.")):YT.loaded?e.ready=!0:YT.ready(d),e}]),angular.module("youMixApp").directive("playerController",function(){return{templateUrl:"views/player-controller.html",restrict:"E"}}),angular.module("youMixApp").controller("InicioCtrl",["$scope","$location","youtubeEmbedUtils","youtubegetdata",function(a,b,c,d){a.msg=!1,a.flagError=!1,a.flagLoadingDown=!1,a.popularLists,a.listsHeader="Más Escuchadas",a.inputLink=!1,a.inputMsg="Búsqueda por enlace externo",a.start=function(){var d=c.getIdListFromURL(a.urlList);-1!==d?b.path("/main/"+d):(a.msg="La URL ingresada no incluye ninguna lista",a.flagError=!0)},a.search=function(){a.flagLoadingDown=!0,d.getResults(a.qrr).then(function(b){a.popularLists=b,0==a.popularLists.length?(a.listsHeader="No hay resultados, pero puede interesarte alguna de estas listas...",e()):a.listsHeader="Resultados",a.flagLoadingDown=!1},function(a){console.log("Error al buscar listas: "+a)})},a.searchBy=function(b){a.flagLoadingDown=!0,d.getResults(b).then(function(c){a.popularLists=c,0==a.popularLists.length?(a.listsHeader="No hay resultados, pero puede interesarte alguna de estas listas...",e()):a.listsHeader=b,a.flagLoadingDown=!1},function(a){console.log("Error al buscar listas: "+a)})};var e=function(){d.getPopularLists().then(function(b){a.popularLists=b},function(a){console.log("Error al buscar listas populares: "+a)})};a.changeInput=function(){a.inputLink===!1?(a.inputLink=!0,a.inputMsg="Búsqueda normal"):(a.inputLink=!1,a.inputMsg="Búsqueda por enlace externo")},e()}]),angular.module("youMixApp").constant("youtubekey","AIzaSyBoYP04DVzCCt2JN1TDqW2Xzx1E2kHhVX0").service("youtubegetdata",["$http","$q","youtubekey",function(a,b,c){this.getTitle=function(d){var e=b.defer(),f=e.promise;a.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+d+"&fields=items(id%2Csnippet)&key="+c).success(function(a){e.resolve(a.items[0].snippet.title)});return f},this.getPopularLists=function(){var d=b.defer(),e=d.promise;a.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q=musica&maxResults=48&type=playlist&key="+c).success(function(a){d.resolve(a.items)});return e},this.getResults=function(d){var e=b.defer(),f=e.promise;a.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q="+d+"&maxResults=48&type=playlist&key="+c).success(function(a){e.resolve(a.items)});return f}}]),angular.module("youMixApp").filter("titleLimit",function(){return function(a,b){return null!=a?a.length>b?a.substring(0,b)+"...":a:void 0}}),angular.module("youMixApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/inicio.html",'<div id="contenedor"> <div class="animated fadeInLeft"> <div class="animated pulse infinite"> <h2 class="text-center"><img src="images/logo.1faef2b6.png" id="logo"></h2> </div> </div> <br> <div class="animated fadeInRight"> <form name="searchList" ng-show="!inputLink"> <div class="input-group animated flipInX"> <input ng-model="qrr" type="text" class="form-control input-transparent font-white" placeholder="Buscar listas de reproducción por nombre, género o artista..." required autofocus> <span class="input-group-btn"> <button class="btn btn-transparent" ng-click="search()" ng-disabled="searchList.$invalid"><span class="font-white glyphicon glyphicon-search" aria-hidden="true"></span></button> </span> </div> </form> <form name="listForm" ng-show="inputLink"> <div class="input-group animated flipInX"> <input ng-model="urlList" type="text" class="form-control input-transparent font-white" placeholder="Pega la URL de la lista aquí..." ng-change="flagError = false" required autofocus> <span class="input-group-btn"> <button class="btn btn-transparent" ng-click="start()" ng-disabled="listForm.$invalid"><span class="glyphicon glyphicon-play font-white" aria-hidden="true"></span></button> </span> </div> <h6 class="errorMsg animated bounceIn" ng-if="flagError">{{msg}}</h6> </form> <a href="" ng-click="searchBy(\'Populares\')" class="tagsLists">Populares</a> <a href="" ng-click="searchBy(\'Fiesta\')" class="tagsLists">Fiesta</a> <a href="" ng-click="searchBy(\'Pop\')" class="tagsLists">Pop</a> <a href="" ng-click="searchBy(\'Electrónica\')" class="tagsLists">Electrónica</a> <a href="" ng-click="changeInput()" class="tagsLists">{{inputMsg}}</a> <hr> </div> <br> <div class="animated fadeIn animationDelay"> <div class="row"> <div class="col-xs-12 col-md-12"> <h3 class="font-white text-center"><div ng-if="!flagLoadingDown">{{listsHeader}}</div><span class="center" ng-class="{\'glyphicon glyphicon-refresh gly-spin\': flagLoadingDown}" aria-hidden="true"></span></h3> </div> </div> <div class="list-group scrollList" id="style-3"> <div ng-repeat="list in popularLists | limitTo: 35" class="animated fadeIn"> <a href="#/main/{{list.id.playlistId}}" class="row list-group-item li-transparent zoom-li"> <div class="col-xs-3 col-md-3 text-center"> <img ng-src="{{list.snippet.thumbnails.default.url}}" alt="Thumbnails" class="img-responsive hvideo"> </div> <div class="col-xs-9 col-md-9 section-box"> <h4 class="list-group-item-heading"><div class="font-white">{{list.snippet.title | titleLimit : 60}}</div></h4> <div class="text-left font-white">{{list.snippet.channelTitle}}</div> <small class="list-group-item-text font-gray"><div class="text-right">{{list.snippet.publishedAt | date}}</div></small> </div> </a> </div> </div> </div> </div> <div id="footer"> <div class="container"> <p class="text-center font-white">Powered by <strong>Agustín Muñoz Campos</strong> - <a href="https://github.com/Agusteen">GitHub: Agusteen</a></p> </div> </div>'),a.put("views/main.html",'<div class="row"> <div class="col-md-1"> <i id="back-btn" class="hovicon mini effect-5 sub-a" ng-click="stop()"><b class="glyphicon glyphicon-arrow-left"></b></i> </div> <div class="col-md-11"> <h4 class="titleNow">{{titleNow}}</h4> </div> </div> <div ng-class="{\'vidtop-content\': flagMain, \'video-background animated fadeIn\' : !flagMain}"> <div data-toggle="tooltip" title="Puede seleccionar otra cancion de la lista" ng-class="{\'videoNext zoom animated fadeIn\': flagMain, \'video-foreground\': !flagMain}"> <h4 ng-if="flagMain">Próximo video...</h4> <div ng-class="{\'embed-responsive embed-responsive-16by9\' : flagMain}"> <youtube-video video-id="firstVideo" player="playerNow" player-vars="playerVars"></youtube-video> </div> </div> </div> <div class="vidtop-content"> <div class="controls"> <player-controller></player-controller> </div> </div> <div ng-if="flagMsg" class="vidtop-content"> <div class="msg" ng-class="{\'animated slideInUp\': msgAnimated, \'animated slideOutDown\': !msgAnimated}"> <h3>{{msg}}</h3> </div> </div> <div ng-class="{\'vidtop-content\': !flagMain, \'video-background animated fadeIn\': flagMain}"> <div data-toggle="tooltip" title="Puede seleccionar otra cancion de la lista" ng-class="{\'videoNext zoom animated fadeIn\': !flagMain, \'video-foreground\': flagMain}"> <h4 ng-if="!flagMain">Próximo video...</h4> <div ng-class="{\'embed-responsive embed-responsive-16by9\' : !flagMain}"> <youtube-video video-id="secondVideo" player="playerSecond" player-vars="playerVars"></youtube-video> </div> </div> </div>'),a.put("views/player-controller.html",'<div class="hovicon small" ng-class="{\'effect-5 sub-a fixNext\': !flagLoading, \'effect-4 sub-a\': flagLoading}" ng-click="crossfader()"><div ng-attr-id="{{flagLoading ? \'cf\': \'\'}}" class="animated zoomIn" ng-class="{\'glyphicon glyphicon-forward\': !flagLoading, \'loader\': flagLoading}"></div></div> <i class="hovicon small effect-5 sub-a" ng-click="playPause()"><b ng-class="{\'glyphicon glyphicon-play\': state%2 === 0, \'glyphicon glyphicon-pause\': state%2 != 0}"></b></i>')}]);