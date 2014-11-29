angular.module('app.controllers').controller('EntryList', function($scope,
        $http, $stateParams, Restangular, SweetAlert, Entries) {
    $scope.loading = false;
    $scope.sort = 'created_at';

    $scope.refresh = function() {
        $scope.page = 1;
        $scope.entries = [];

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

        Entries.getList(params).then(function(entries) {
            entries.forEach(function(entry) {
                $scope.entries.push(entry);
            });

            $scope.loading = false;
        });
    };

    $scope.showReplyBox = function(parent, entry) {
        parent.showReplyBox = true;

        if (!parent.newReply) {
            parent.newReply = { text: '' };
        }

        parent.newReply.text += "@" + entry.user.name + ": ";
    };

    $scope.addReply = function(parent) {
        $scope.adding = true;

        var newReply = {
            text: parent.newReply.text,
        };

        Restangular.one('entries', parent._id).all('replies')
                .post(newReply).then(function() {
            delete parent.newReply;
            parent.showReplyBox = false;
        }, function() {
            SweetAlert.swal("Błąd", "Ups, co poszło nie tak :(", "error");
        })
        .finally(function() {
            $scope.adding = false;
        });
    };

    $scope.addEntry = function(entry) {
        $scope.adding = true;

        var newEntry = {
            text: entry.text,
            group: entry.group._id
        };

        Entries.post(newEntry).then(function() {
            $scope.newEntry.text = '';
        }, function() {
            SweetAlert.swal("Błąd", "Ups, cos poszło nie tak :(", "error");
        })
        .finally(function() {
            $scope.adding = false;
        });
    };

    $scope.refresh();
});
