angular.module('app.controllers').controller('Navigation',
        function($scope, $rootScope, Session, Auth, $state) {
    $scope.specialGroups = [
        {
            _id: 'subscribed',
            name: 'Subskrybowane',
            groups: Auth.check() ? Auth.user.subscribed_groups : []
        },
        {
            _id: 'moderated',
            name: 'Moderowane',
            groups: Auth.check() ? Auth.user.moderated_groups : []
        }
    ];

    $scope.changeGroup = function(group) {
        Session.currentGroup = group;
        $rootScope.$emit('groupChange', group);

        $state.go('app.g.' + Session.currentTab + '.list', {
            group: group._id
        });
    };

    $scope.changeFolder = function(folder) {
        Session.currentFolder = folder;

        $state.go('app.f.' + Session.currentTab + '.list', {
            folder: folder._id
        });
    };
});
