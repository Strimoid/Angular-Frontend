angular.module('app.directives').directive('groupSelect',
        function($window, $document, Auth, Groups) {
    function link (scope, element, attrs) {
        scope.groups = [];

        scope.loadDefault = function() {
            if (Auth.guest()) return;

            scope.groups = Auth.user.subscribed_groups;
        };

        scope.loadGroups = function(name) {
            if (!name || name.length < 3) {
                scope.loadDefault();
                return;
            }

            scope.groups = Groups.getList({ name: name }).$object;
        };

        scope.loadDefault();
    }

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'directive/group-select.html',
        link: link
    };
});
