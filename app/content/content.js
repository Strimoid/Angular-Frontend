angular.module('app.controllers').controller('Content',
        function($scope, $http, $stateParams, Restangular) {
    $scope.content = Restangular.one('contents', $stateParams.id).get().$object;
});
