angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise('/g/all');
    $stateProvider
        .state('app', {
            abstract: true,
            templateUrl: 'app.html'
        })
        .state('app.f', {
            abstract: true,
            url: '/f/{folder}',
            templateUrl: 'common/in_folder.html'
        })
        .state('app.f.content', {
            abstract: true,
            template: '<div ui-view="list" /> <ui-view/><ui-view/>'
        })
        .state('app.f.content.list', {
            url: '',
            views: {
                'list': {
                    templateUrl: 'content/list.html',
                    controller: 'ContentList'
                }
            }
        })
        .state('app.f.comment', {
            abstract: true,
            template: '<ui-view/>'
        })
        .state('app.f.comment.list', {
            url: '/komentarze',
            templateUrl: 'comment/list.html',
            controller: 'CommentList'
        })
        .state('app.f.entry', {
            abstract: true,
            template: '<ui-view/>'
        })
        .state('app.f.entry.list', {
            url: '/wpisy',
            templateUrl: 'entry/list.html',
            controller: 'EntryList'
        })
        .state('app.g', {
            abstract: true,
            url: '/g/{group}',
            templateUrl: 'common/in_group.html'
        })
        .state('app.g.content', {
            abstract: true,
            template: '<div ui-view="list" ng-show="$state.includes(\'app.g.content.list\')" /> <ui-view/>'
        })
        .state('app.g.content.list', {
            url: '',
            views: {
                'list': {
                    templateUrl: 'content/list.html',
                    controller: 'ContentList'
                }
            },
            sticky: true
        })
        .state('app.g.content.detail', {
            url: '/c/:id',
            templateUrl: 'content/content.html',
            controller: 'Content'
        })
        .state('app.g.comment', {
            abstract: true,
            template: '<ui-view/>'
        })
        .state('app.g.comment.list', {
            url: '/komentarze',
            templateUrl: 'comment/list.html',
            controller: 'CommentList'
        })
        .state('app.g.entry', {
            abstract: true,
            template: '<ui-view/>'
        })
        .state('app.g.entry.list', {
            url: '/wpisy',
            templateUrl: 'entry/list.html',
            controller: 'EntryList'
        })
        .state('app.group', {
            abstract: true,
            template: '<ui-view/>'
        })
        .state('app.group.list', {
            url: '/grupy',
            templateUrl: 'group/list.html',
            controller: 'GroupList'
        })
        .state('app.notification', {
            abstract: true
        })
        .state('app.notification.list', {
            url: '/powiadomienia',
            templateUrl: 'notification/list.html',
            controller: 'NotificationList'
        })
        .state('app.settings', {
            url: '/ustawienia',
            templateUrl: 'settings/settings.html',
            controller: 'Settings'
        })
        .state('app.settings.profile', {
            url: '/profil',
            templateUrl: 'settings/tabs/profile.html',
        })
        .state('app.user', {
            url: '/u/:user',
            templateUrl: 'user/profile.html',
            //controller: 'UserProfile'
        })
        .state('app.conversations', {
            url: '/konwersacje',
            templateUrl: 'conversation/list.html',
            //controller: 'ConversationList'
        })
        ;
});
