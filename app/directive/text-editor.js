angular.module('app.directives').directive('textEditor',
        function($window, $document) {
    function link (scope, element, attrs) {
        element.on('select', function() {
            $document.find('[text-editor-buttons="#'+ attrs.id +'"]')
              .find('i').removeClass('text-muted');
        });

        element.on('blur focus keydown mousedown', function() {
            $document.find('[text-editor-buttons="#'+ attrs.id +'"]')
              .find('i').addClass('text-muted');
        });
    }

    return {
        restrict: 'A',
        link: link
    };
})
