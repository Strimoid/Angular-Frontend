angular.module('app.filters').filter('cdn', function () {
    return function (path, type, w, h) {
        var url = '//static.strimoid.pl/';

        if (w && h) {
            url += w + 'x' + h + '/';
        }

        url += type + '/' + path;

        return url;
    };
});
