angular.module('app.controllers').controller('ContentList', function($scope,
        $rootScope, $http, Restangular, Session, $stateParams, $sce) {
    $scope.loading = false;
    $scope.sort = 'created_at';

    var baseContents = Restangular.all('contents');

    $scope.refresh = function() {
        $scope.page = 1;
        $scope.contents = [];

        $scope.loadContents();
    };

    $scope.loadMore = function() {
        $scope.page++;
        $scope.loadContents();
    };

    $scope.loadContents = function() {
        $scope.loading = true;

        var params = {
            page: $scope.page,
            sort: $scope.sort,
            folder: $stateParams.folder,
            group: $stateParams.group
        };

        baseContents.getList(params).then(function(contents) {
            contents.forEach(function(content) {
                $scope.contents.push(content);
            });

            $scope.loading = false;
        });
    };

    $scope.sortBy = function(field) {
        $scope.sort = field;
        $scope.refresh();
    };

    $scope.embedMedia = function(content) {
        if (content.type != 'video' && content.type != 'photo') {
            return;
        }

        var url = content.url.replace(/.*?:\/\//g, '');
        url = encodeURIComponent(url);
        $http.get('https://embed.strimoid.pl/url/' + url)
                .success(function(data) {
            var html = '';

            if (data.html) {
                html = data.html;
            } else {
                html = '<img src="' + data.links[0].href + '">';
            }

            content.embedCode = $sce.trustAsHtml(html);
            content.showEmbed = true;
        });
    };

    $rootScope.$on('groupChange', function(event, group) {
        $scope.refresh();
    });

    $scope.refresh();
});
