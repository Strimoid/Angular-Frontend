angular.module('app.controllers').controller('AppCtrl',
        function($scope, $localStorage, $window) {
    // add 'ie' classes to html
    var isIE = !!navigator.userAgent.match(/MSIE/i);

    if(isIE)
        angular.element($window.document.body).addClass('ie');

    if (isSmartDevice($window))
        angular.element($window.document.body).addClass('smart');

    // config
    $scope.app = {
      name: 'Strimoid',
      version: '1.0.0',
      // for chart colors
      color: {
        primary: '#7266ba',
        info:    '#23b7e5',
        success: '#27c24c',
        warning: '#fad733',
        danger:  '#f05050',
        light:   '#e8eff0',
        dark:    '#3a3f51',
        black:   '#1c2b36'
      },
      settings: {
        themeID: 1,
        navbarHeaderColor: 'bg-black',
        navbarCollapseColor: 'bg-white-only',
        asideColor: 'bg-black',
        headerFixed: true,
        asideFixed: false,
        asideFolded: false
      }
    };

    // save settings to local storage
    if (angular.isDefined($localStorage.settings)) {
      $scope.app.settings = $localStorage.settings;
    } else {
      $localStorage.settings = $scope.app.settings;
    }

    $scope.$watch('app.settings', function(){
        $localStorage.settings = $scope.app.settings;
    }, true);

    function isSmartDevice( $window )
    {
        // Adapted from http://www.detectmobilebrowsers.com
        var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
        // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
    }
});
