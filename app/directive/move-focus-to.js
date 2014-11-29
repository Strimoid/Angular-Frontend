angular.module('app.directives').directive('moveFocusTo',
        function($window, $document) {
    function link (scope, element, attrs) {
        element.on('click', function() {
            $document.find(attrs.moveFocusTo)[0].focus();
        });
    }

    return {
        restrict: 'A',
        link: link
    };
});
