angular.module('app.controllers').controller('Header',
        function($scope, $modal, Restangular, Auth, $state, Session) {
    var AddContentCtrl = function ($scope, $modalInstance, Session, Restangular) {
        $scope.content = { thumbnail: true };
        $scope.loading = false;

        $scope.ok = function() {
            $scope.loading = true;

            Restangular.all('content').post($scope.content).then(function(data) {
                $scope.loading = false;
                $modalInstance.close();
                $state.go('app.g.content.detail', { id: data._id });
            }, function() {
                $scope.loading = false;
            });
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    };

    $scope.addContent = function() {
        var modalInstance = $modal.open({
            templateUrl: 'content/add_content.html',
            controller: AddContentCtrl
        });
    };

    var LoginCtrl = function ($scope, $rootScope, $modalInstance, Session,
         Restangular, Auth) {
        $scope.credentials = {};
        $scope.loading = false;
        $scope.invalidCredentials = false;

        $scope.ok = function() {
            $scope.loading = true;

            Restangular.all('login').post($scope.credentials).then(function(data) {
                $scope.loading = false;
                Auth.setUser(data.user);
                $modalInstance.close();
            }, function() {
                $scope.loading = false;
                $scope.invalidCredentials = true;
            });
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    };

    $scope.openLoginModal = function() {
        var modalInstance = $modal.open({
            templateUrl: 'auth/login.html',
            controller: LoginCtrl
        });
    };

    $scope.logout = function() {
        Auth.logout();
    };

    $scope.switchTab = function (tab) {
        Session.currentTab = tab;

        var groupId = Session.currentGroup._id;
        var type = Session.currentType.charAt(0);

        $state.go('app.' + type + '.' + tab +'.list', { group: groupId });
    };
});
