"use strict";angular.module("iframeScaffolder",["ngSanitize","ngAnimate","ui.router","ui.bootstrap","ui.validate","ui.sortable","zeroclipboard","ngMaterial","720kb.socialshare"]),angular.module("iframeScaffolder").run(["$rootScope","$location","$window",function(e,t,a){e.$on("$stateChangeSuccess",function(){a.ga&&a.ga("send","pageview",{page:t.url()})})}]),angular.module("iframeScaffolder").config(["$urlRouterProvider","$sceProvider","$tooltipProvider","uiZeroclipConfigProvider",function(e,t,a,l){e.otherwise("/"),t.enabled(!1),a.options({appendToBody:!0}),l.setZcConf({swfPath:"./assets/swf/ZeroClipboard.swf"})}]),angular.module("iframeScaffolder").config(["$stateProvider","SCAFFOLDER",function(e,t){e.state("view",{url:"/view?"+Object.keys(t.state.params).join("&"),templateUrl:"app/view/view.html",controller:"ViewCtrl",params:t.state.params})}]),function(e){try{e=angular.module("iframeScaffolder")}catch(t){e=angular.module("iframeScaffolder",[])}e.run(["$templateCache",function(e){e.put("app/view/view.html",'<div class="view"><div class="view__scaffolder"><scaffolder options="options"></scaffolder></div></div>')}])}(),angular.module("iframeScaffolder").controller("ViewCtrl",["$scope","$stateParams",function(e,t){e.options={layout:t.layout,theme:t.theme||"default",urls:decodeURIComponent(t.urls).split(","),active:parseInt(t.active),sharing:parseInt(t.sharing),autoplay:parseInt(t.autoplay),title:t.title,description:t.description}}]),angular.module("iframeScaffolder").config(["$stateProvider","SCAFFOLDER",function(e,t){e.state("home",{url:"/",params:t.state.params,templateUrl:"app/main/main.html",controller:"MainCtrl"})}]),function(e){try{e=angular.module("iframeScaffolder")}catch(t){e=angular.module("iframeScaffolder",[])}e.run(["$templateCache",function(e){e.put("app/main/main.html",'<div class="introduction"><a class="introduction__logo-container" target="_blank" href="//www.google.com/trends/"><md-button class="md-fab md-mini" aria-label="Back to Google Trends"><md-icon md-svg-src="assets/images/arrow_back.svg"></md-icon></md-button><md-icon aria-label="Google" class="introduction__logo-container__google"></md-icon><h1 class="introduction__logo-container__trends">Trends</h1></a><div class="container"><h2>Data from Google</h2><p class="lead text-muted">This tool helps you to quickly arrange several iframes together.</p></div></div><div class="container"><div class="row editor"><div class="col-md-4"><div class="panel editor__step panel-default"><div class="editor__step__label"></div><form class="panel-body" name="addUrlForm" role="form" ng-submit="addUrl()"><div class="input-group"><input type="text" required="" ui-validate="{ isUrl: \'isUrlValid($value)\' }" name="newUrl" ng-model="newUrl" class="form-control" placeholder="An URL or an iframe code"> <span class="input-group-btn"><button class="btn btn-primary" ng-disabled="!addUrlForm.$valid" type="submit" tooltip="Create an iframe with this URL">Add</button></span></div><div ng-show="addUrlForm.newUrl.$error.isUrl && !addUrlForm.newUrl.$error.required" class="editor__step__error text-danger small">This is not a valid URL or iframe.</div></form><ul class="list-group" ui-sortable="" ng-model="options.urls"><li class="list-group-item editor__step__url" ng-repeat="url in options.urls track by $index"><div><div class="btn-group btn-group-xs pull-right editor__step__url__actions"><button type="button" class="btn btn-default" tooltip="Change the label describing this iframe" ng-click="editLabel($index)">Edit label</button> <button type="button" class="btn btn-default" ng-click="removeUrl($index)" tooltip="Remove this iframe"><i class="fa fa-trash-o"></i></button></div><a ng-href="{{scaffolder.url($index, true)}}" target="_blank" class="editor__step__url__value">{{scaffolder.label($index)}}</a></div><form ng-submit="saveLabel($index)" ng-show="!!labels[$index] || labels[$index] === \'\'" class="editor__step__url__edit-label"><div class="input-group input-group-sm"><input type="text" ng-model="labels[$index]" class="form-control"> <span class="input-group-btn"><button class="btn btn-default" type="submit">Save</button></span></div></form></li></ul></div><div class="panel editor__step panel-default" ng-class="{ \'editor__step--disable\': !options.urls.length }"><div class="editor__step__label"></div><div class="panel-body"><p>Choose a layout&nbsp; <small class="text-muted">(how iframes are arranged)</small></p><div class="text-center btn-group"><button class="btn btn-default btn-sm" ng-class="{active: options.layout == \'menu\'}" ng-click="options.layout = \'menu\'" tooltip="Toggle iframes using a menu">≡◻</button> <button class="btn btn-default btn-sm" ng-class="{active: options.layout == \'narrative\'}" ng-click="options.layout = \'narrative\'" tooltip="Toggle iframes using next and previous buttons">⍃ ⍄</button> <button class="btn btn-default btn-sm" ng-class="{active: options.layout == \'tabs\'}" ng-click="options.layout = \'tabs\'" tooltip="Toggle iframes using tabs">⎍⎍</button> <button class="btn btn-default btn-sm" ng-class="{active: options.layout == \'horizontal\'}" ng-click="options.layout = \'horizontal\'" tooltip="All iframes have equal width">▯▯▯</button> <button class="btn btn-default btn-sm" ng-class="{active: options.layout == \'head\'}" ng-click="options.layout = \'head\'" tooltip="The first iframe use half of the screen, the others a stacked">▯▤</button> <button class="btn btn-default btn-sm" ng-class="{active: options.layout == \'tail\'}" ng-click="options.layout = \'tail\'" tooltip="The last iframe use half of the screen, the others a stacked">▤▯</button></div></div></div><div class="panel editor__step panel-default" ng-class="{ \'editor__step--disable\': !options.urls.length }"><div class="editor__step__label"></div><div class="panel-body"><div class="pull-right" dropdown=""><span class="btn-group"><i class="scaffolder--{{options.theme}}__preview editor__step__theme-preview disabled btn btn-xs"></i> <button class="btn btn-default btn-xs" dropdown-toggle="">{{ getTheme(options.theme).label }} &nbsp;<i class="caret"></i></button></span><ul class="dropdown-menu" role="menu"><li ng-repeat="theme in themes" class="editor__step__theme"><a ng-click="options.theme = theme.slug"><i class="scaffolder--{{theme.slug}}__preview editor__step__theme__preview"></i> {{theme.label}}</a></li></ul></div>Choose a theme&nbsp;</div></div><div class="panel editor__step panel-default" ng-class="{ \'editor__step--disable\': !options.urls.length }"><div class="editor__step__label"></div><div class="panel-body form-horizontal"><div class="form-group"><label for="input-title" class="control-label col-sm-4">Choose a title</label><div class="col-sm-8"><input type="text" class="form-control" ng-model="options.title" id="input-title"></div></div><div class="form-group editor__step__last-group"><label for="input-description" class="control-label col-sm-4">Describe</label><div class="col-sm-8"><textarea class="form-control" ng-model="options.description" id="input-description"></textarea></div></div></div></div><div class="panel editor__step panel-default" ng-class="{ \'editor__step--disable\': !options.urls.length }"><div class="editor__step__label"></div><div class="panel-body"><p><button class="btn btn-primary btn-xs pull-right" ui-zeroclip="" zeroclip-model="getViewIframe()" title="Copy the embed code to you clipboard.">Copy</button> Export the mosaic</p><p><textarea class="form-control" select-on-click="" readonly="">{{getViewIframe()}}</textarea></p><a class="editor__step__show-more-options" ng-class="{ \'editor__step__show-more-options--active\': showMoreOptions}" ng-click="showMoreOptions = !showMoreOptions"><i class="caret"></i>&nbsp; More options</a></div><div ng-show="showMoreOptions"><div class="editor__step__option"><div class="pull-left editor__step__iframe-label"><strong>Change the size&nbsp;</strong><br><label class="editor__step__iframe-label__fluid"><input type="checkbox" ng-model="useFluid"> Use a fluid width</label></div><div class="text-right editor__step__iframe-size"><input type="number" ng-disabled="useFluid" ng-model="width" min="50" class="form-control input-sm editor__step__iframe-size__size"> x <input type="number" ng-model="height" min="50" class="form-control input-sm editor__step__iframe-size__size"></div></div><fieldset ng-disabled="!scaffolder.hasMenu()" class="editor__step__options-group"><div class="editor__step__not-available" ng-show="!scaffolder.hasMenu()"><div class="editor__step__not-available__label">Not available for this layout</div></div><div class="editor__step__option"><div class="row"><div class="col-xs-6"><label for="input-autoplay">Choose the 1<sup>st</sup> iframe</label></div><div class="col-xs-6"><select id="input-active" ng-model="options.active" class="form-control input-sm"><option value="{{$index}}" ng-repeat="url in options.urls track by $index">{{scaffolder.label($index)}}</option></select></div></div></div><div class="editor__step__option"><div class="row"><div class="col-xs-6"><label for="input-autoplay">Autoplay to the next</label></div><div class="col-xs-6"><select id="input-autoplay" ng-model="options.autoplay" class="form-control input-sm"><option value="0">Do not autoplay</option><option value="1">Every 1 second</option><option value="2">Every 2 seconds</option><option value="4">Every 4 seconds</option><option value="8">Every 8 seconds</option><option value="16">Every 16 seconds</option></select></div></div></div><div class="editor__step__option"><div class="checkbox"><label for="input-loop"><input type="checkbox" ng-model="options.loop" ng-true-value="1" ng-false-value="0" id="input-loop"> Loop autoplay</label><p class="text-muted small">When reaching the end of the autoplay.</p></div></div><div class="editor__step__option"><div class="checkbox"><label for="input-sharing"><input type="checkbox" ng-model="options.sharing" ng-true-value="1" ng-false-value="0" id="input-sharing"> Allow iframe sharing</label><p class="text-muted small">The user will be able to share each iframe individually.</p></div></div></fieldset></div></div><div class="text-muted small editor__credits hidden-xs hidden-sm"></div></div><div class="col-md-8"><div class="panel panel-default editor__preview"><div class="editor__preview__empty-alert" ng-hide="options.urls.length"><div class="lead editor__preview__empty-alert__message"><p>Add an iframe\'s URL on the <span class="hidden-sm hidden-xs">left&nbsp;</span>panel to preview the mosaic here.</p><p><a ng-click="pickExample()" class="btn btn-link" ng-show="examples.length">See an example.</a> {{example}}</p></div></div><div class="panel-heading"><div class="input-group"><input class="form-control form-link" type="text" value="{{getViewUrl()}}" select-on-click="" readonly=""> <span class="input-group-btn"><a class="btn btn-link" href="{{getViewUrl()}}" target="_blank" tooltip="Open the iframe in a new window"><i class="fa fa-external-link"></i></a> <a class="btn btn-link" tooltip="Permalink to edit the same mosaic" ui-sref="fork(scaffolder.serialized())"><i class="fa fa-pencil-square"></i></a></span></div></div><div class="editor__preview__scaffolder"><scaffolder options="options"></scaffolder></div></div><div class="editor__credits text-right">Forked from <a href="https://github.com/pirhoo/iframe-scaffolder" target="_blank">Iframe Scaffolder</a> by <a href="http://jplusplus.org" target="_blank">Journalism++</a></div></div></div></div>')}])}(),angular.module("iframeScaffolder").controller("MainCtrl",["$scope","$state","$stateParams","$http","Scaffolder","SCAFFOLDER",function(e,t,a,l,i,o){var s=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;e.options={title:a.title,description:a.description,active:parseInt(a.active),sharing:parseInt(a.sharing),autoplay:parseInt(a.autoplay),loop:parseInt(a.loop),layout:a.layout,theme:a.theme,urls:a.urls&&""!==a.urls?a.urls.split(","):[]},e.scaffolder=new i(e.options),e.width=o.width,e.height=o.height,e.themes=o.themes,e.examples=[],e.getTheme=function(t){var a=null;return angular.forEach(e.themes,function(e){e.slug===t&&(a=e)}),a},l.get("assets/examples.json").success(function(t){e.examples=t}),e.getTheme=function(e){var t=null;return angular.forEach(o.themes,function(a){a.slug===e&&(t=a)}),t},e.isUrlValid=function(t){return null!==e.extractUrl(t)},e.extractUrl=function(e){var t=null;if(s.test(e))return e;try{t=$(e).attr("src"),0===t.indexOf("//")&&(t="http:"+t)}catch(a){return null}return void 0!==t&&s.test(t)?t:null},e.addUrl=function(){var t=e.extractUrl(e.newUrl);null!==t&&(e.options.urls.push(t.replace(/,/g,"%2C")),e.newUrl=null)},e.removeUrl=function(t){e.options.urls.splice(t,1)},e.getViewUrl=function(){return e.scaffolder.viewUrl(e.scaffolder.firstIframe)},e.getViewIframe=function(){var t=e.getViewUrl(),a=e.useFluid?"100%":e.width||o.width,l=e.height||o.height;return'<iframe src="'+t+'" width="'+a+'" height="'+l+'" frameborder="0" allowfullscreen></iframe>'},e.pickExample=function(){var t=e.examples[Math.floor(Math.random()*e.examples.length)];angular.extend(e.options,angular.copy(t))},e.editLabel=function(t){e.labels={},e.labels[t]=e.scaffolder.label(t,"")},e.saveLabel=function(t){var a=(e.labels[t]||"").replace(/\||,/gi," ");e.labels={},e.options.urls[t]=""!==a?a+"|"+e.scaffolder.url(t,!0):e.scaffolder.url(t,!0)},e.$watch("options",function(){e.scaffolder=new i(e.options)},!0)}]),angular.module("iframeScaffolder").config(["$stateProvider","SCAFFOLDER",function(e,t){e.state("fork",{url:"/fork?"+Object.keys(t.state.params).join("&"),controller:"ForkCtrl",params:t.state.params})}]),angular.module("iframeScaffolder").controller("ForkCtrl",["$state","$stateParams",function(e,t){e.go("home",t)}]),angular.module("iframeScaffolder").config(["$stateProvider",function(e){e.state("shorten",{url:"/s/:id",controller:"ShortenCtrl"})}]),angular.module("iframeScaffolder").controller("ShortenCtrl",["$stateParams","$window",function(e,t){var a=t.location.protocol+"//goo.gl/"+e.id;t.location=a}]),angular.module("iframeScaffolder").directive("iframeIndicator",function(){return{restrict:"A",link:function(e,t){var a=t.find("iframe");a.on("load",function(){t.removeClass("iframe-indicator--loading")}),e.$watch(function(){return a.attr("src")},function(){t.addClass("iframe-indicator--loading")},!0)}}});var SCAFFOLDER_IFRAME_CLS="scaffolder__container__iframe",hasClass=function(e,t){return e.indexOf(SCAFFOLDER_IFRAME_CLS+"--"+t)>-1};angular.module("iframeScaffolder").animation("."+SCAFFOLDER_IFRAME_CLS+"--anim-horizontal",function(){return{addClass:function(e,t,a){$(e).velocity("stop").velocity({translateY:"0%"},0),hasClass(t,"was-before")?$(e).velocity({translateX:"-100%"},0).velocity({translateX:"0%"},600,a):hasClass(t,"was-after")?$(e).velocity({translateX:"100%"},0).velocity({translateX:"0%"},600,a):hasClass(t,"before")?$(e).velocity({translateX:"0%"},0).velocity({translateX:"-100%"},600,a):hasClass(t,"after")?$(e).velocity({translateX:"0%"},0).velocity({translateX:"100%"},600,a):a()}}}).animation("."+SCAFFOLDER_IFRAME_CLS+"--anim-vertical",function(){return{addClass:function(e,t,a){$(e).velocity("stop").velocity({translateX:"0%"},0),hasClass(t,"was-before")?$(e).velocity({translateY:"-100%"},0).velocity({translateY:"0%"},600,a):hasClass(t,"was-after")?$(e).velocity({translateY:"100%"},0).velocity({translateY:"0%"},600,a):hasClass(t,"before")?$(e).velocity({translateY:"0%"},0).velocity({translateY:"-100%"},600,a):hasClass(t,"after")?$(e).velocity({translateY:"0%"},0).velocity({translateY:"100%"},600,a):a()}}}),angular.module("iframeScaffolder").constant("SCAFFOLDER",{state:{params:{urls:{value:""},active:{value:"0"},sharing:{value:"1"},autoplay:{value:"0"},loop:{value:"1"},layout:{value:"menu"},theme:{value:"default"},title:{value:null},description:{value:null}}},layouts:{vertical:["menu"],horizontal:["tabs","narrative"],splitted:["horizontal","head","tail"],togglable:["menu","tabs","narrative"]},shortenerInterface:"//white-shortener.herokuapp.com",shortenerProvider:"goo.gl",width:600,height:450,themes:[{slug:"default",label:"Default"},{slug:"blue-grey",label:"Blue grey"},{slug:"pink",label:"Pink"},{slug:"grey",label:"Grey"},{slug:"blue",label:"Blue"},{slug:"indigo",label:"Indigo"},{slug:"red",label:"Red"},{slug:"deep-orange",label:"Deep orange"},{slug:"yellow",label:"Yellow"},{slug:"teal",label:"Teal"},{slug:"green",label:"Gree"}]}),angular.module("iframeScaffolder").controller("ScaffolderCtrl",["$scope","$state","$http","Scaffolder","SCAFFOLDER",function(e,t,a,l,i){var o=e.options;e.scaffolder=new l(o),e.shouldDisplaySharingPopup=!1,e.toggleSharingPopup=function(){if(e.shouldDisplaySharingPopup=!e.shouldDisplaySharingPopup,e.shouldDisplaySharingPopup){e.scaffolder.stop();var l=e.sharingUrl=e.scaffolder.viewUrl(e.scaffolder.active),o={params:{url:l},cache:!0};a.get(i.shortenerInterface,o).then(function(a){if(a.data.id){var l=i.shortenerProvider+"/",o=a.data.id.split(l)[1];e.sharingUrl=t.href("shorten",{id:o},{absolute:!0})}})}},e.iframeWidth=function(){switch(o.layout){case"horizontal":return 100/o.urls.length+"%";case"head":return"50%";case"menu":return"75%";case"tabs":return"100%";case"narrative":return"100%"}},e.iframeHeight=function(e,t,a){return"horizontal"===o.layout||"menu"===o.layout||"head"===o.layout&&t||"tail"===o.layout&&a?"100%":"tabs"===o.layout||"narrative"===o.layout?void 0:100/(o.urls.length-1)+"%"},e.iframeClasses=function(t,a,l){var s=t===e.active,r=e.previous===t||Math.abs(e.active-t)<=1;return{"scaffolder__container__iframe--last":l,"scaffolder__container__iframe--first":a,"scaffolder__container__iframe--active":s,"scaffolder__container__iframe--was-before":s&&t<e.previous,"scaffolder__container__iframe--was-after":s&&t>e.previous,"scaffolder__container__iframe--before":r&&t<e.active,"scaffolder__container__iframe--after":r&&t>e.active,"scaffolder__container__iframe--anim-vertical":i.layouts.vertical.indexOf(o.layout)>-1,"scaffolder__container__iframe--anim-horizontal":i.layouts.horizontal.indexOf(o.layout)>-1}},e.iframeStyle=function(t,a,l){return{width:e.iframeWidth(t,a,l),height:e.iframeHeight(t,a,l)}},e.getViewIframe=function(){var t=e.scaffolder.viewUrl(),a="100%",l=e.height||i.height;return'<iframe src="'+t+'" width="'+a+'" height="'+l+'" frameborder="0" allowfullscreen></iframe>'},e.menuLinkClasses=function(t){var a=e.scaffolder,l="narrative"===o.layout;return{active:a.isActive(t),"pull-left":l&&a.isPrevious(t),"pull-right":l&&a.isNext(t),hidden:l&&!a.isNext(t)&&!a.isPrevious(t)}},e.$watch("scaffolder.active",function(t,a){e.previous=a,e.active=t}),e.$watch("options",function(){e.scaffolder=new l(o)},!0)}]),angular.module("iframeScaffolder").directive("scaffolder",function(){return{restrict:"E",controller:"ScaffolderCtrl",templateUrl:"components/scaffolder/scaffolder.html",scope:{options:"="}}}),angular.module("iframeScaffolder").service("Scaffolder",["$state","$timeout","SCAFFOLDER",function(e,t,a){function l(e){return e=angular.extend(angular.copy(i),e),angular.extend(this,e),this.firstIframe=parseInt(e.active||0),this.activate(this.firstIframe,parseInt(e.autoplay)>0),this}var i={urls:[],active:0,sharing:1,autoplay:0,theme:"default",layout:"menu"};return l.prototype.serialized=function(e){var t=angular.fromJson(angular.toJson(this));return t.urls=t.urls.join(","),t.active=e||t.active||0,t},l.prototype.viewUrl=function(t){return e.href("view",this.serialized(t),{absolute:!0})},l.prototype.url=function(e,t){var a=this.urls[e];return this.isVisible(e)||t?this.hasLabel(e)?a.split("|")[1]:a:void 0},l.prototype.isActive=function(e){return e===this.active},l.prototype.activate=function(e,t){this.active=e<this.urls.length?e:0,t===!0?this.start():this.stop()},l.prototype.start=function(){var e=this;this.autoplayTimeout=t(function(){(e.loop||e.active+1<e.urls.length)&&e.activate(e.active+1,!0)},1e3*this.autoplay)},l.prototype.stop=function(){t.cancel(this.autoplayTimeout)},l.prototype.getActive=function(e){var t=this.label(this.active,e),a=this.description;return a=this.title&&a?this.title+" - "+a:a||this.title,{label:t,url:this.url(this.active),description:a}},l.prototype.isVisible=function(e){return!this.hasMenu()||this.isActive(e)},l.prototype.isEdge=function(e){return Math.abs(this.active-e)<=1},l.prototype.isPrevious=function(e){return e===this.active-1},l.prototype.isNext=function(e){return e===this.active+1},l.prototype.hasLabel=function(e){return this.urls[e]&&this.urls[e].indexOf("|http")>-1},l.prototype.label=function(e,t){var a=this.urls[e];return this.hasLabel(e)?a.split("|")[0]:"undefined"!=typeof t&&null!==t?t:a},l.prototype.hasMenu=function(){return a.layouts.togglable.indexOf(this.layout)>-1},l}]),angular.module("iframeScaffolder").directive("selectOnClick",["$window",function(e){return{restrict:"A",link:function(t,a){a.on("click",function(){e.getSelection().toString()||this.setSelectionRange(0,this.value.length)})}}}]),function(e){try{e=angular.module("iframeScaffolder")}catch(t){e=angular.module("iframeScaffolder",[])}e.run(["$templateCache",function(e){e.put("components/scaffolder/scaffolder.html",'<div class="scaffolder scaffolder--{{options.layout}} scaffolder--{{options.theme}}" layout="column" layout-align="start start"><div class="scaffolder__header" ng-if="options.title || options.description"><h3 class="scaffolder__header__title" ng-if="options.title">{{ options.title }}</h3><p class="scaffolder__header__description lead" ng-if="options.description">{{ options.description }}</p></div><div class="scaffolder__container" flex=""><aside ng-show="scaffolder.hasMenu()" class="scaffolder__container__menu"><ul class="nav nav-pills" ng-class="{ \'nav-stacked\': options.layout === \'menu\' }"><li ng-repeat="url in options.urls track by $index" ng-class="menuLinkClasses($index)" class="scaffolder__container__menu__item"><a ng-click="scaffolder.activate($index)">{{scaffolder.label($index, "Iframe " + ($index+1))}}</a></li></ul><h4 class="scaffolder__container__title">{{ scaffolder.getActive( \'Iframe \' + ($index + 1) ).label }}</h4></aside><div ng-repeat="url in options.urls track by $index" ng-style="iframeStyle($index, $first, $last)" ng-show="scaffolder.isVisible($index, true)" ng-class="iframeClasses($index, $first, $last)" iframe-indicator="" class="scaffolder__container__iframe"><iframe frameborder="0" width="100%" height="100%" ng-src="{{ scaffolder.url($index) }}"></iframe></div></div><div class="scaffolder__footer"><a target="_blank" href="//www.google.com/trends/"><img src="assets/images/googletrends.png" height="18" alt="Google Trends"></a><div class="scaffolder__footer__sharing-toggler" ng-show="options.sharing && scaffolder.hasMenu() && scaffolder.urls.length"><button class="btn btn-xs btn-default" ng-click="toggleSharingPopup()"><i class="fa fa-fw fa-share"></i> Share this view</button></div></div><div class="scaffolder__sharing-popup ng-hide" ng-show="shouldDisplaySharingPopup"><div class="scaffolder__sharing-popup__overlay" ng-click="toggleSharingPopup()"></div><div class="scaffolder__sharing-popup__panel panel panel-default" ng-show="shouldDisplaySharingPopup"><button class="scaffolder__sharing-popup__panel__close" ng-click="toggleSharingPopup()"><span aria-hidden="true">×</span></button><div class="panel-body"><h3>Share</h3><p>Share this view on social networks by clicking here:</p><p><a socialshare="" socialshare-text="{{ scaffolder.getActive( \'Iframe \' + ($index + 1) ).label }}" socialshare-url="{{ sharingUrl }}" socialshare-provider="twitter" class="btn btn-default scaffolder__sharing-popup__panel__twitter"><i class="fa fa-fw fa-twitter"></i> Twitter</a> <a socialshare="" socialshare-text="{{ scaffolder.getActive( \'Iframe \' + ($index + 1) ).label }}" socialshare-description="{{ scaffolder.getActive( \'Iframe \' + ($index + 1) ).description }}" socialshare-url="{{ sharingUrl }}" socialshare-provider="facebook" socialshare-type="feed" socialshare-to="" socialshare-from="" socialshare-ref="" socialshare-display="popup" socialshare-via="1491916714459281" socialshare-redirect-uri="https://googletrends.github.io/iframe-scaffolder/close.html" class="btn btn-default scaffolder__sharing-popup__panel__facebook"><i class="fa fa-fw fa-facebook"></i> Facebook</a></p><h3>Embed</h3><p>Please use the following embed code to share this view in your publications:</p><textarea class="form-control" select-on-click="" readonly="">{{ getViewIframe() }}</textarea><h3>Link</h3><p>This link will jump directly to this view:</p><input class="form-control form-link" select-on-click="" readonly="" value="{{ sharingUrl }}"></div></div></div></div>')}])}();