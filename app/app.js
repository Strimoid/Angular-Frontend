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
    'gettext'
  ])
.run(function ($rootScope, $state, $stateParams,
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
     $compileProvider, $filterProvider, $provide, $stickyStateProvider) {
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
/**
 * jQuery plugin config use ui-jq directive , config the js and css files that required
 * key: function name of the jQuery plugin
 * value: array of the css js file located
 */
.constant('JQ_CONFIG', {
    easyPieChart:   ['js/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
    sparkline:      ['js/jquery/charts/sparkline/jquery.sparkline.min.js'],
    plot:           ['js/jquery/charts/flot/jquery.flot.min.js',
                        'js/jquery/charts/flot/jquery.flot.resize.js',
                        'js/jquery/charts/flot/jquery.flot.tooltip.min.js',
                        'js/jquery/charts/flot/jquery.flot.spline.js',
                        'js/jquery/charts/flot/jquery.flot.orderBars.js',
                        'js/jquery/charts/flot/jquery.flot.pie.min.js'],
    sortable:       ['js/jquery/sortable/jquery.sortable.js'],
    nestable:       ['js/jquery/nestable/jquery.nestable.js',
                        'js/jquery/nestable/nestable.css'],
    filestyle:      ['js/jquery/file/bootstrap-filestyle.min.js'],
    slider:         ['js/jquery/slider/bootstrap-slider.js',
                        'js/jquery/slider/slider.css'],
    chosen:         ['js/jquery/chosen/chosen.jquery.min.js',
                        'js/jquery/chosen/chosen.css'],
    TouchSpin:      ['js/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                        'js/jquery/spinner/jquery.bootstrap-touchspin.css'],
    wysiwyg:        ['js/jquery/wysiwyg/bootstrap-wysiwyg.js',
                        'js/jquery/wysiwyg/jquery.hotkeys.js'],
    dataTable:      ['js/jquery/datatables/jquery.dataTables.min.js',
                        'js/jquery/datatables/dataTables.bootstrap.js',
                        'js/jquery/datatables/dataTables.bootstrap.css'],
    vectorMap:      ['js/jquery/jvectormap/jquery-jvectormap.min.js',
                        'js/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                        'js/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                        'js/jquery/jvectormap/jquery-jvectormap.css'],
    footable:       ['js/jquery/footable/footable.all.min.js',
                        'js/jquery/footable/footable.core.css']
    }
)

.constant('MODULE_CONFIG', {
    select2:        ['js/jquery/select2/select2.css',
                        'js/jquery/select2/select2-bootstrap.css',
                        'js/jquery/select2/select2.min.js',
                        'js/modules/ui-select2.js']
    }
)
.constant('angularMomentConfig', {
    preprocess: 'utc',
})
;
