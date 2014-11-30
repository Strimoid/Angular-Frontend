angular.module('app.directives').directive('voteButtons',
        function($window, $document) {
    function controller ($scope, Restangular) {
        var baseVotes = Restangular.all('votes');

        $scope.update = function(el, newState, data) {
            el.vote_state = newState;
            el.uv = data.uv;
            el.dv = data.dv;
        };

        $scope.addVote = function(el, type, up){
            var vote = { id: el._id, type: type, up: up ? 'true' : false };

            return baseVotes.post(vote).then(function(data){
                $scope.update(el, up ? 'uv' : 'dv', data);
            });
        };

        $scope.removeVote = function(el, type){
            var vote = { id: el._id, type: type};

            return baseVotes.remove(vote).then(function(data){
                $scope.update(el, 'none', data);
            });
        };

        $scope.vote = function(el, type, up) {
            if (el.vote_state == 'none') {
                $scope.addVote(el, type, up);
            } else if ((el.vote_state == 'uv' && up) || (el.vote_state == 'dv' && !up)) {
                $scope.removeVote(el, type);
            } else {
                $scope.removeVote(el, type).then(function() {
                    $scope.addVote(el, type, up);
                });
            }
        };

        $scope.showList = function(el, up) {
            var list = '';

            _.filter(el.votes, function(vote){ return vote.up  == up; })
                    .forEach(function(vote) {
                list += '<li>' + vote.user_id + '</li>';
            });

            if (list) {
                return '<ul>' + list + '</ul>';
            }

            return null;
        };
    }

    return {
        restrict: 'E',
        scope: {
            object: '=',
            type : '@',
            btnClass: '@'
        },
        controller: controller,
        templateUrl: 'directive/vote-buttons.html'
    };
});
