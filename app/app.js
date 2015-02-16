// Declare app level module which depends on filters, and services
var app = angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngStorage',
    'ngSanitize',
    'ui.bootstrap',
    'ui.jq',
    'ui.validate',
    'ui.select',
    'ui.router',
    'ct.ui.router.extras',
    'app.config',
    'app.filters',
    'app.services',
    'app.directives',
    'app.controllers',
    'app.templates',
    'angularMoment',
    'infinite-scroll',
    'restangular',
    'angular-ladda',
    'btford.socket-io',
    'xeditable',
    'http-auth-interceptor',
    'oitozero.ngSweetAlert',
    'gettext',
    'algoliasearch',
    'pubnub.angular.service'
  ])
    .run(function ($rootScope, $state, $stateParams, PubNub,
                   amMoment, Auth, Session, gettextCatalog) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.Auth = Auth;
      $rootScope.Session = Session;

      amMoment.changeLocale('pl');
      gettextCatalog.setCurrentLanguage('pl');

      var lastScrollPosition;

      $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams){
          if (fromState.sticky) {
            lastScrollPosition = $(window).scrollTop();
          }
        });

      $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
          if (toState.sticky && lastScrollPosition) {
            setTimeout(function() { $(window).scrollTop(lastScrollPosition); }, 0);
          }

          if (toParams.group && !Session.currentGroup) {
            Session.currentGroup = { _id: toParams.group };
          }

          if (toParams.folder && !Session.currentFolder) {
            Session.currentFolder = { _id: $stateParams.folder };
          }
        });

      PubNub.init({
        publish_key: 'pub-c-c7fe8f07-c4a8-41e4-8f6b-3b90adb40e4e',
        subscribe_key: 'sub-c-c6949fbe-a943-11e4-ad17-0619f8945a4f '
      });
    })
    .config(function(RestangularProvider) {
      RestangularProvider.setBaseUrl('https://strimoid.pl/api/v1');
      RestangularProvider.setResponseExtractor(function(response, operation) {
        if (response.data) {
          return response.data;
        }

        return response;
      });
      RestangularProvider.setDefaultHttpFields({
        withCredentials: true,
        useXDomain : true
      });
    })
    .config(function ($stateProvider, $urlRouterProvider, $controllerProvider,
                      $compileProvider, $filterProvider, $provide) {
      // lazy controller, directive and service
      app.controller = $controllerProvider.register;
      app.directive  = $compileProvider.directive;
      app.filter     = $filterProvider.register;
      app.factory    = $provide.factory;
      app.service    = $provide.service;
      app.constant   = $provide.constant;
      app.value      = $provide.value;
    })
    .config(function($locationProvider){
      $locationProvider.html5Mode(true);
    })
  ;
