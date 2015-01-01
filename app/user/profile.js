angular.module('app.controllers').controller('UserProfile',
        function($scope, $stateParams, Users) {
    $scope.user = Users.one($stateParams.user).get().$object;
});
