angular.module('app.controllers').controller('ConversationList',
        function($scope, Restangular) {
    $scope.loading = false;
    $scope.sort = 'created_at';

    var baseConversations = Restangular.all('conversations');

    $scope.refresh = function() {
        $scope.page = 1;
        $scope.conversations = [];

        $scope.loadConversations();
    };

    $scope.loadConversations = function() {
        $scope.loading = true;

        baseConversations.getList().then(function(conversations) {
            conversations.forEach(function(conversation) {
                $scope.conversations.push(conversation);
            });

            $scope.loading = false;
        });
    };

    $scope.refresh();
});
