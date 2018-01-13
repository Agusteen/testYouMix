"use strict";angular.module("youMixApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","pascalprecht.translate"]).config(["$routeProvider",function(a){a.when("/main/:urlList",{templateUrl:"views/main.html",controller:"youtubeCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/",{templateUrl:"views/inicio.html",controller:"InicioCtrl",controllerAs:"inicio"}).otherwise({redirectTo:"/"})}]).config(["$translateProvider",function(a){a.translations("en",translationsEN).translations("sp",translationsSP).registerAvailableLanguageKeys(["en","sp"],{"en*":"en","es*":"sp","*":"en"}).uniformLanguageTag("bcp47").preferredLanguage("sp").useSanitizeValueStrategy(null)}]);var translationsEN={CATEGORIA:"Top Lists",PLACEHOLDERINICIO:"Search playlist by name, music genre or artists...",TFIESTA:"Party",TELECTRONICA:"Electronic",LENGUAGE:"Español",BNORMAL:"Normal Search",BENLACE:"Search by external link",PLACEHOLDERLINK:"Paste the URL list here...",ERRORURL:"URL entered not include any list",RESOLUTION1:"So you have a better experience",RESOLUTION2:"YouMix only works on larger screens than these",ADELANTARP:"Forward main video",RETROCEDERP:"Rewind main video",ADELANTARN:"Forward next video",RETROCEDERN:"Rewind next video",KEYC:"Play next video",KEYH:"Show/Hide next video",PROXVIDEO:"Next video...",INICIAMAIN:"Starting..."},translationsSP={CATEGORIA:"Más Escuchadas",PLACEHOLDERINICIO:"Buscar listas de reproducción por nombre, género o artista...",TFIESTA:"Fiesta",TELECTRONICA:"Electrónica",LENGUAGE:"English",BNORMAL:"Búsqueda normal",BENLACE:"Búsqueda por enlace externo",PLACEHOLDERLINK:"Pega la URL de la lista aquí...",ERRORURL:"La URL ingresada no incluye ninguna lista",RESOLUTION1:"Para que tengas una mejor experiencia",RESOLUTION2:"YouMix solo funciona en pantallas más grandes que estas",ADELANTARP:"Adelantar video principal",RETROCEDERP:"Retroceder video principal",ADELANTARN:"Adelantar próximo video",RETROCEDERN:"Retroceder próximo video",KEYC:"Siguiente video",KEYH:"Ocultar/Mostrar siguiente video",PROXVIDEO:"Próximo video...",INICIAMAIN:"Iniciando..."};angular.module("youMixApp").controller("youtubeCtrl",["$scope","$routeParams","$location","youtubeEmbedUtils","youtubegetdata","$interval","$translate",function(a,b,c,d,e,f,g){function h(){var b=a.currentVideo();switch(event.keyCode){case 39:if(a.focusBackVideo=!1,!b)break;b.seekTo(b.getCurrentTime()+4);break;case 37:if(a.focusBackVideo=!1,!b)break;b.seekTo(b.getCurrentTime()-4);break;case 32:a.playPause();break;case 67:a.crossfader();break;case 38:if(a.$apply(function(){a.focusBackVideo=!0}),b=a.backVideo(),!b)break;b.seekTo(b.getCurrentTime()+3);break;case 40:if(a.$apply(function(){a.focusBackVideo=!0}),b=a.backVideo(),!b)break;b.seekTo(b.getCurrentTime()-3);break;case 72:a.focusBackVideo=!0,a.hideShowNextVideo()}}a.flagMain=!1,a.flagLoading=!0,a.state=0,a.msg="",a.flagMsg=!0,a.msgAnimated=!0,a.titleNext,a.titleNow,a.focusBackVideo=!1,a.hideNextVideo=!1,a.flagUseKeys=!1,a.flagIniciando=!0;var i=0;a.playerVars={list:b.urlList,controls:0,autoplay:1,iv_load_policy:3,disablekb:0,rel:0},a.stop=function(){a.state=0,c.path("/main/"),a=a.$new(!0)};var j=function(b){var c=d.getIdFromURL(b.getVideoUrl()),f=e.getTitle(c);f.then(function(b){a.titleNow=b})["catch"](function(a){console.log("No se pudo obtener el titulo del video")})};a.$on("youtube.player.playing",function(b,c){0===a.state?(a.playerSecond.stopVideo(),c.setVolume(100),a.playerSecond.playVideoAt(c.getPlaylistIndex()+1),a.prepareVideo(a.playerSecond),a.flagIniciando=!1,a.state=1,a.msgAnimated=!1,j(a.playerNow),m(a.playerNow)):1===a.state?(i++,1===a.playerSecond.getPlayerState()&&i>2&&k(a.playerSecond)):3===a.state?(i++,1===a.playerNow.getPlayerState()&&i>2&&k(a.playerNow)):(2===a.state||4===a.state)&&l()});var k=function(b){b.pauseVideo(),i>5&&(a.msgAnimated=!0,a.flagIniciando=!1,"sp"==g.use()?a.msg="Usá el boton Siguiente o la tecla C para pasar a ese video":a.msg="Use next button or press C to play to that video",setTimeout(function(){a.$apply(function(){a.msgAnimated=!1,a.forceNext=0})},5e3))};a.$on("youtube.player.error",function(){a.state=5,a.msgAnimated=!0,a.flagIniciando=!1,a.msg="¡Esos videos no funcionan aquí!"}),a.$on("youtube.player.ended",function(){if(0!==a.playerNow.getPlayerState()||a.flagLoading){if(0!==a.playerSecond.getPlayerState()||a.flagLoading)return;a.flagLoading=!0,a.endVideo(a.playerSecond,a.playerNow),a.state=1}else a.flagLoading=!0,a.endVideo(a.playerNow,a.playerSecond),a.state=3}),a.prepareVideo=function(b){function c(){b.setVolume(0),setTimeout(function(){b.pauseVideo(),-1===b.getPlayerState()||2===b.getPlayerState()?(b.setVolume(2),a.$apply(function(){a.flagLoading=!1})):c()},1500)}a.flagUseKeys=!1,c()},a.crossfader=function(){a.focusBackVideo=!1,i>2&&(i=0,a.msgAnimated=!1),i=0,1!==a.playerNow.getPlayerState()||a.flagLoading?1!==a.playerSecond.getPlayerState()||a.flagLoading?l():(a.flagLoading=!0,a.flagUseKeys=!0,a.endVideo(a.playerSecond,a.playerNow,30,200),a.state=1):(a.flagLoading=!0,a.flagUseKeys=!0,a.endVideo(a.playerNow,a.playerSecond,30,200),a.state=3)};var l=function(){if(i>2&&(i=0,a.msgAnimated=!1),i=0,2!==a.state||a.flagLoading){if(4!==a.state||a.flagLoading)return;a.flagLoading=!0,a.flagUseKeys=!0,a.endVideo(a.playerSecond,a.playerNow,10,10),a.state=1}else a.flagLoading=!0,a.flagUseKeys=!0,a.endVideo(a.playerNow,a.playerSecond,10,10),a.state=3},m=function(b){var c=f(function(){b.getCurrentTime()>=b.getDuration()-20&&(f.cancel(c),a.crossfader())},7e3)};a.playPause=function(){a.focusBackVideo=!1,1===a.state?(a.playerNow.pauseVideo(),a.state=2):3===a.state?(a.playerSecond.pauseVideo(),a.state=4):2===a.state?(a.playerNow.playVideo(),a.state=1):4===a.state?(a.playerSecond.playVideo(),a.state=3):(a.playerNow.playVideo(),a.state=1)},a.startVideo=function(a,b){function c(){setTimeout(function(){a.setVolume(d),d+=5,d>2&&105>d&&c()},b)}a.playVideo();var d=a.getVolume();c()},a.endVideo=function(b,c,d,e){function f(){setTimeout(function(){b.setVolume(g),g-=5,g>2?f():(b.stopVideo(),a.flagMain?a.flagMain=!1:a.flagMain=!0,b.playVideoAt(c.getPlaylistIndex()+1),a.prepareVideo(b),j(c),m(c))},e)}var g=b.getVolume();a.startVideo(c,d),f()},window.focus(),window.onkeydown=h,a.currentVideo=function(){return 1!==a.playerNow.getPlayerState()||a.flagUseKeys?1!==a.playerSecond.getPlayerState()||a.flagUseKeys?void 0:a.playerSecond:a.playerNow},a.backVideo=function(){return 1!==a.playerNow.getPlayerState()||a.flagUseKeys?1!==a.playerSecond.getPlayerState()||a.flagUseKeys?void 0:a.playerNow:a.playerSecond},a.hideShowNextVideo=function(){a.$apply(function(){a.hideNextVideo=!a.hideNextVideo})},a.hideShowNextVideoClick=function(){a.hideNextVideo=!a.hideNextVideo},$(document).ready(function(){$("#tglReferences").popover({html:!0,content:function(){return $("#keyReference").html()}})})}]),angular.module("youMixApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("youMixApp").directive("youtubeVideo",["$window","youtubeEmbedUtils",function(a,b){var c=1,d={"-1":"unstarted",0:"ended",1:"playing",2:"paused",3:"buffering",5:"queued"},e="youtube.player.";return a.YTConfig={host:"https://www.youtube.com"},{restrict:"EA",scope:{videoId:"=?",videoUrl:"=?",player:"=?",playerVars:"=?",playerHeight:"=?",playerWidth:"=?"},link:function(a,f,g){function h(){var b=Array.prototype.slice.call(arguments);a.$apply(function(){a.$emit.apply(a,b)})}function i(b){var c=d[b.data];"undefined"!=typeof c&&h(e+c,a.player,b),a.$apply(function(){a.player.currentState=c})}function j(b){h(e+"ready",a.player,b)}function k(b){h(e+"error",a.player,b)}function l(){var b=angular.copy(a.playerVars);b.start=b.start||a.urlStartTime;var c=new YT.Player(n,{height:a.playerHeight,width:a.playerWidth,videoId:a.videoId,playerVars:b,events:{onReady:j,onStateChange:i,onError:k}});return c.id=n,c}function m(){(a.videoId||a.playerVars.list)&&(a.player&&"function"==typeof a.player.destroy&&a.player.destroy(),a.player=l())}a.utils=b;var n=g.playerId||f[0].id||"unique-youtube-embed-id-"+c++;f[0].id=n,a.playerHeight=a.playerHeight||390,a.playerWidth=a.playerWidth||640,a.playerVars=a.playerVars||{};var o=a.$watch(function(){return a.utils.ready&&("undefined"!=typeof a.videoUrl||"undefined"!=typeof a.videoId||"undefined"!=typeof a.playerVars.list)},function(b){b&&(o(),"undefined"!=typeof a.videoUrl?a.$watch("videoUrl",function(b){a.videoId=a.utils.getIdFromURL(b),a.urlStartTime=a.utils.getTimeFromURL(b),m()}):"undefined"!=typeof a.videoId?a.$watch("videoId",function(){a.urlStartTime=null,m()}):a.$watch("playerVars.list",function(){a.urlStartTime=null,m()}))});a.$watchCollection(["playerHeight","playerWidth"],function(){a.player&&a.player.setSize(a.playerWidth,a.playerHeight)}),a.$on("$destroy",function(){a.player&&a.player.destroy()})}}}]),angular.module("youMixApp").service("youtubeEmbedUtils",["$window","$rootScope",function(a,b){function c(a,b){return a.indexOf(b)>-1}function d(){b.$apply(function(){e.ready=!0})}var e={},f=/https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi,g=/t=(\d+)[ms]?(\d+)?s?/;return e.getIdFromURL=function(a){var b=a.replace(f,"$1");if(c(b,";")){var d=b.split(";");if(c(d[1],"%")){var e=decodeURIComponent(d[1]);b=("http://youtube.com"+e).replace(f,"$1")}else b=d[0]}else c(b,"#")&&(b=b.split("#")[0]);return b},e.getIdListFromURL=function(a){if(c(a,"list=")){var b,d=a.split("list=");return c(d[1],"&")?(b=d[1].split("&"),b[0]):c(a,"#")?(b=d[1].split("#"),b[0]):d[1]}return-1},e.getTimeFromURL=function(a){a=a||"";var b=a.match(g);if(!b)return 0;var d=b[0],e=b[1],f=b[2];return"undefined"!=typeof f?(f=parseInt(f,10),e=parseInt(e,10)):c(d,"m")?(e=parseInt(e,10),f=0):(f=parseInt(e,10),e=0),f+60*e},e.ready=!1,"undefined"==typeof YT?(a.onYouTubeIframeAPIReady=d,console.log("Unable to find YouTube iframe library on this page.")):YT.loaded?e.ready=!0:YT.ready(d),e}]),angular.module("youMixApp").directive("playerController",function(){return{templateUrl:"views/player-controller.html",restrict:"E"}}),angular.module("youMixApp").controller("InicioCtrl",["$scope","$location","youtubeEmbedUtils","youtubegetdata","$translate",function(a,b,c,d,e){a.flagError=!1,a.flagLoadingDown=!1,a.popularLists,a.listsHeader="",a.inputLink=!1,a.flagFadeOut=!1,a.flagInicio=!0,a.flagSearchLink=!0,a.start=function(){var d=c.getIdListFromURL(a.urlList);-1!==d?(a.flagFadeOut=!0,setTimeout(function(){a.$apply(function(){b.path("/main/"+d)})},500)):a.flagError=!0},a.startFromLink=function(c){a.flagFadeOut=!0,setTimeout(function(){a.$apply(function(){b.path("/main/"+c)})},500)},a.search=function(){a.flagLoadingDown=!0,a.flagInicio=!1,d.getResults(a.qrr).then(function(b){a.popularLists=b,0==a.popularLists.length?(f(),g()):"sp"==e.use()?a.listsHeader="Resultados":a.listsHeader="Results",a.flagLoadingDown=!1})["catch"](f())};var f=function(){"sp"==e.use()?a.listsHeader="No hay resultados, pero puede interesarte alguna de estas listas...":a.listsHeader="No results, but you may be interested in one of these playlists..."};a.searchBy=function(b){a.flagLoadingDown=!0,a.flagInicio=!1,d.getResults(e.instant(b)).then(function(c){a.popularLists=c,0==a.popularLists.length?(f(),g()):a.listsHeader=e.instant(b),a.flagLoadingDown=!1})};var g=function(){d.getPopularLists().then(function(b){a.popularLists=b},function(a){console.log("Error al buscar listas populares: "+a)})};a.changeInput=function(){a.flagSearchLink=!a.flagSearchLink,a.inputLink=!a.inputLink},a.changeLanguage=function(){"sp"==e.use()?(e.use("en"),a.lenguage="Español"):(e.use("sp"),a.lenguage="English")},g()}]),angular.module("youMixApp").constant("youtubekey","AIzaSyBoYP04DVzCCt2JN1TDqW2Xzx1E2kHhVX0").service("youtubegetdata",["$http","$q","youtubekey",function(a,b,c){this.getTitle=function(d){var e=b.defer(),f=e.promise;a.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+d+"&fields=items(id%2Csnippet)&key="+c).success(function(a){e.resolve(a.items[0].snippet.title)});return f},this.getPopularLists=function(){var d=b.defer(),e=d.promise;a.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q=playlist&maxResults=48&type=playlist&key="+c).success(function(a){d.resolve(a.items)});return e},this.getResults=function(d){var e=b.defer(),f=e.promise;a.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q="+d+"&maxResults=48&type=playlist&key="+c).success(function(a){e.resolve(a.items)});return f}}]),angular.module("youMixApp").filter("titleLimit",function(){return function(a,b){return null!=a?a.length>b?a.substring(0,b)+"...":a:void 0}}),angular.module("youMixApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/inicio.html",'<div class="bgYoumix" ng-class="{\'animated fadeOut\': flagFadeOut}"> <div class="btesting"> <img id="btest" src="../images/beta-testing.6290ef4f.png" alt="betatesting"> <div class="infotest"> <h2 style="background-color:red">Por favor, todavía no compartir la web!!</h2> <h4>Se agradece probar:</h4> <h4>- Correcto bloqueo al abrir la web en smartphones</h4> <h4>- Traducciones al ingles</h4> <h4>- Busquedas</h4> <h4>- Busqueada por enlace externo</h4> <h4>- Control por teclado</h4> <h4>- Reproductor</h4> <h4>+ No se agregarán nuevas funcionalidades.</h4> <h4>+ Cualquier sugerencia, crítica es bienvenida.</h4> <h3>Gracias!</h3> </div> </div> <div class="lenguageSelect"> <h5 ng-click="changeLanguage()" id="lenguageNow">{{\'LENGUAGE\' | translate}}</h5> </div> <div id="contenedor"> <div class="animated fadeInLeft"> <div class="animated pulse infinite"> <h2 class="text-center"><img src="images/logo.1faef2b6.png" id="logo"></h2> </div> </div> <br> <div id="blockResolution"> <h5>{{\'RESOLUTION1\' | translate}}</h5> <h4>{{\'RESOLUTION2\' | translate}}</h4> <h3>:D</h3> </div> <div id="showControls"> <div class="animated fadeInRight"> <form name="searchList" ng-show="!inputLink"> <div class="input-group animated flipInX"> <input ng-model="qrr" type="text" class="form-control input-transparent font-white" placeholder="{{ \'PLACEHOLDERINICIO\' | translate }}" required autofocus> <span class="input-group-btn"> <button class="btn btn-transparent" ng-click="search()" ng-disabled="searchList.$invalid"><span class="font-white glyphicon glyphicon-search" aria-hidden="true"></span></button> </span> </div> </form> <form name="listForm" ng-show="inputLink"> <div class="input-group animated flipInX"> <input ng-model="urlList" type="text" class="form-control input-transparent font-white" placeholder="{{\'PLACEHOLDERLINK\' | translate}}" ng-change="flagError = false" required autofocus> <span class="input-group-btn"> <button class="btn btn-transparent" ng-click="start()" ng-disabled="listForm.$invalid"><span class="glyphicon glyphicon-play font-white" aria-hidden="true"></span></button> </span> </div> <h6 class="errorMsg animated bounceIn" ng-if="flagError">{{\'ERRORURL\' | translate}}</h6> </form> <a href="" ng-click="searchBy(\'Chill\')" class="tagsLists">Chillout</a> <a href="" ng-click="searchBy(\'TFIESTA\')" class="tagsLists">{{ \'TFIESTA\' | translate}}</a> <a href="" ng-click="searchBy(\'Pop\')" class="tagsLists">Pop</a> <a href="" ng-click="searchBy(\'House\')" class="tagsLists">House</a> <a href="" ng-click="changeInput()" class="tagsLists" ng-if="flagSearchLink">{{\'BENLACE\' | translate}}</a> <a href="" ng-click="changeInput()" class="tagsLists" ng-if="!flagSearchLink">{{\'BNORMAL\' | translate}}</a> <hr> </div> <br> <div class="animated fadeIn animationDelay"> <div class="row"> <div class="col-xs-12 col-md-12"> <h3 class="font-white text-center"> <div ng-if="flagInicio">{{\'CATEGORIA\' | translate}}</div> <div ng-if="!flagLoadingDown && !flagInicio">{{listsHeader}}</div> <span class="center" ng-class="{\'glyphicon glyphicon-refresh gly-spin\': flagLoadingDown}" aria-hidden="true"></span></h3> </div> </div> <div class="btesting"> <img id="btest" src="../images/beta-testing.6290ef4f.png" alt="betatesting"> </div> <div class="list-group scrollList" id="style-3"> <div ng-repeat="list in popularLists | limitTo: 35" class="animated fadeIn"> <a ng-click="startFromLink(list.id.playlistId)" class="row list-group-item li-transparent zoom-li"> <div class="col-xs-3 col-md-3 text-center"> <img ng-src="{{list.snippet.thumbnails.default.url}}" alt="Thumbnails" class="img-responsive hvideo"> </div> <div class="col-xs-9 col-md-9 section-box"> <h4 class="list-group-item-heading"><div class="font-white">{{list.snippet.title | titleLimit : 60}}</div></h4> <div class="text-left font-white">{{list.snippet.channelTitle}}</div> <small class="list-group-item-text font-gray"><div class="text-right">{{list.snippet.publishedAt | date}}</div></small> </div> </a> </div> </div> </div> </div> </div> <div id="footer"> <div class="container"> <p class="text-center font-white">Powered by <strong>Agustín Muñoz Campos</strong> - <a href="https://github.com/Agusteen">GitHub: Agusteen</a></p> </div> </div> </div>'),a.put("views/main.html",'<div id="blockResolution"> <h5>{{\'RESOLUTION1\' | translate}}</h5> <h4>{{\'RESOLUTION2\' | translate}}</h4> <h3>:D</h3> </div> <div id="showControls"> <div class="animated fadeIn"> <div class="row"> <div class="col-md-1"> <i id="back-btn" class="hovicon mini effect-5 sub-a" ng-click="stop()"><b class="glyphicon glyphicon-arrow-left"></b></i> </div> <div class="col-md-11"> <h4 class="headerMain row"> <div class="col-md-12"> <div class="titleNow">{{titleNow}}</div> <div id="tglReferences" class="iconKeyboard" data-container="body" data-toggle="popover" data-target="#keyReference" data-placement="bottom"><i class="far fa-keyboard"></i></div> </div> <div id="keyReference" style="display: none"> <div class="row itemReference"> <div class="iconReference"> <i class="far fa-caret-square-right"></i> </div> {{\'ADELANTARP\' | translate}} </div> <div class="row itemReference"> <div class="iconReference"> <i class="far fa-caret-square-left"></i> </div> {{\'RETROCEDERP\' | translate}} </div> <div class="row itemReference"> <div class="iconReference"> <i class="far fa-caret-square-up"></i> </div> {{\'ADELANTARN\' | translate}} </div> <div class="row itemReference"> <div class="iconReference"> <i class="far fa-caret-square-down"></i> </div> {{\'RETROCEDERN\' | translate}} </div> <div class="row itemReference"> <div class="iconReference"> <div class="tecla"> C </div> </div> {{\'KEYC\' | translate}} </div> <div class="row itemReference"> <div class="iconReference"> <div class="tecla"> H </div> </div> {{\'KEYH\' | translate}} </div> </div> </h4> </div> </div> <div ng-class="{\'vidtop-content\': flagMain, \'video-background animated fadeIn\' : !flagMain}"> <div data-toggle="tooltip" title="Puede seleccionar otra cancion de la lista" ng-class="{\'videoNext  zoom animated zoomInDown\': flagMain, \'video-foreground\': !flagMain, \'focus\': focusBackVideo && flagMain, \'videoNextHide\': hideNextVideo}"> <h4 ng-if="flagMain">{{\'PROXVIDEO\' | translate}} <div id="pushpin" ng-class="{\'colorActive\': !hideNextVideo}" ng-click="hideShowNextVideoClick()"> <i class="glyphicon glyphicon-pushpin"></i> </div> </h4> <div ng-class="{\'embed-responsive embed-responsive-16by9\' : flagMain}"> <youtube-video video-id="firstVideo" player="playerNow" player-vars="playerVars"></youtube-video> </div> </div> </div> <div class="vidtop-content"> <div class="controls"> <player-controller></player-controller> </div> </div> <div ng-if="flagMsg" class="vidtop-content"> <div class="msg" ng-class="{\'animated slideInUp\': msgAnimated, \'animated slideOutDown\': !msgAnimated}"> <h4 ng-if="!flagIniciando">{{msg}}</h4> <h4 ng-if="flagIniciando">{{\'INICIAMAIN\' | translate}}</h4> </div> </div> <div ng-class="{\'vidtop-content\': !flagMain, \'video-background animated fadeIn\': flagMain}"> <div data-toggle="tooltip" title="Puede seleccionar otra cancion de la lista" ng-class="{\'videoNext zoom animated zoomInDown\': !flagMain, \'video-foreground\': flagMain, \'focus\': focusBackVideo && !flagMain, \'videoNextHide\': hideNextVideo}"> <h4 ng-if="!flagMain">{{\'PROXVIDEO\' | translate}} <div id="pushpin" ng-class="{\'colorActive\': !hideNextVideo}" ng-click="hideShowNextVideoClick()"> <i class="glyphicon glyphicon-pushpin"></i> </div> </h4> <div ng-class="{\'embed-responsive embed-responsive-16by9\' : !flagMain}"> <youtube-video video-id="secondVideo" player="playerSecond" player-vars="playerVars"></youtube-video> </div> </div> </div> </div> </div>'),a.put("views/player-controller.html",'<div class="hovicon small" ng-class="{\'effect-5 sub-a fixNext\': !flagLoading, \'effect-4 sub-a\': flagLoading}" ng-click="crossfader()"><div ng-attr-id="{{flagLoading ? \'cf\': \'\'}}" class="animated zoomIn" ng-class="{\'glyphicon glyphicon-forward\': !flagLoading, \'loader\': flagLoading}"></div></div> <i class="hovicon small effect-5 sub-a" ng-click="playPause()"><b ng-class="{\'glyphicon glyphicon-play\': state%2 === 0, \'glyphicon glyphicon-pause\': state%2 != 0}"></b></i>')}]);