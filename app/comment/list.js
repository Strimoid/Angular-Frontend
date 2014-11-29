angular.module('app.controllers').controller('CommentList', function($scope,
        $http, $stateParams, Restangular) {
    $scope.loading = false;
    $scope.sort = 'created_at';

    var baseComments = Restangular.all('comments');

    $scope.refresh = function() {
        $scope.page = 1;
        $scope.comments = [];

        $scope.loadEntries();
    };

    $scope.loadEntries = function() {
        $scope.loading = true;

        var params = {
            page: $scope.page,
            sort: $scope.sort,
            folder: $stateParams.folder,
            group: $stateParams.group
        };

        baseComments.getList(params).then(function(comments) {
            comments.forEach(function(comment) {
                $scope.comments.push(comment);
            });

            $scope.loading = false;
        });
    };

    $scope.refresh();
});
