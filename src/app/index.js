'use strict';

angular.module('iframeScaffolder')
  .config(function ($stateProvider, $urlRouterProvider, $sceProvider, $tooltipProvider, uiZeroclipConfigProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        params: {
          urls: { value: ''},
          layout: { value: 'menu'},
          theme: { value: 'default'},
          title: { value: null},
          description: { value: null}
        },
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('view', {
        url: '/view?urls&layout&theme&title&description&active&sharing',
        templateUrl: 'app/view/view.html',
        controller: 'ViewCtrl',
      })
      .state('fork', {
        url: '/fork?urls&layout&theme&active&sharing&title&description',
        controller: 'ForkCtrl'
      });

    $urlRouterProvider.otherwise('/');
    $sceProvider.enabled(false);
    // config ui-bootstrap
    $tooltipProvider.options({ appendToBody: true });
    // config ZeroClipboard
    uiZeroclipConfigProvider.setZcConf({
      swfPath: 'bower_components/zeroclipboard/dist/ZeroClipboard.swf'
    });
  });
