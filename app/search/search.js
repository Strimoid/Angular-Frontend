angular.module('app.controllers').controller('Search',
  function($scope, Search) {
    $scope.hits = [];
    $scope.query = '';

    $scope.$watch('query', function() {
      Search.search($scope.query, function(success, content) {
        if (!success) return;

        $scope.hits = content.hits;
      });
    });
  });
