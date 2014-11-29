angular.module('app.controllers').controller('GroupList',
        function($scope, Restangular) {
    $scope.loading = false;
    $scope.sort = 'created_at';

    var baseGroups = Restangular.all('groups');

    $scope.refresh = function() {
        $scope.page = 1;
        $scope.groups = [];

        $scope.loadGroups();
    };

    $scope.loadGroups = function() {
        $scope.loading = true;

        var params = {
            page: $scope.page,
            sort: $scope.sort
        };

        baseGroups.getList(params).then(function(groups) {
            groups.forEach(function(group) {
                $scope.groups.push(group);
            });

            $scope.loading = false;
        });
    };

    $scope.refresh();
});
