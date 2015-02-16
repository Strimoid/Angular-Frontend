angular.module('app.services', [])
    .factory('Session', function() {
        var currentFolder, currentGroup, currentTab, currentType;

        function Session() {
            currentTab = 'content';
            currentType = 'group';
            currentGroup = { _id: 'popular', name: 'Popularne' };
        }

        Session.prototype = {
            get currentFolder() {
                return currentFolder;
            },
            set currentFolder (folder) {
                currentFolder = folder;
                currentType = 'folder';
            },
            get currentGroup () {
                return currentGroup;
            },
            set currentGroup (group) {
                currentGroup = group;
                currentType = 'group';
            },
            get currentTab () {
                return currentTab;
            },
            set currentTab (tab) {
                currentTab = tab;
            },
            get currentType () {
                return currentType;
            }
        };

        return new Session();
    })
    .factory('Auth', function($localStorage, authService) {
        var user;

        function Auth() {
            if ($localStorage.user) {
                user = $localStorage.user;
            }
        }

        Auth.prototype = {
            setUser: function(newUser) {
                user = newUser;
                $localStorage.user = user;
                authService.loginConfirmed();
            },
            check: function() {
                return user != null;
            },
            guest: function() {
                return user == null;
            },
            logout: function() {
                user = null;
            },
            get user () {
                return user;
            }
        };

        return new Auth();
    })
    .factory('Socket', function (socketFactory) {
        var ioSocket = io.connect('/some/path');

        var socket = socketFactory({
            ioSocket: myIoSocket
        });

        return socket;
    })
    .factory('Contents', function(Restangular) {
        return Restangular.service('contents');
    })
    .factory('Groups', function(Restangular) {
        return Restangular.service('groups');
    })
    .factory('Entries', function(Restangular) {
        return Restangular.service('entries');
    })
    .factory('Users', function(Restangular) {
        return Restangular.service('users');
    })
  .factory('Search', function(algolia, ALGOLIA_APP_ID, ALGOLIA_KEY) {
    return algolia.Client(ALGOLIA_APP_ID, ALGOLIA_KEY).initIndex('prod_contents');
  });
