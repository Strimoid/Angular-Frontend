angular.module('app.directives').directive('textEditorButtons',
        function($window, $document) {
    function link (scope, element, attrs) {
        var replaceSelection = function(format) {
            var ta = $document.find(attrs.textEditorButtons)[0];

            var start = ta.selectionStart;
            var end = ta.selectionEnd;

            var oldText = ta.value;
            var newText = format.replace('%s', oldText);

            ta.value = oldText.substring(0, start) + newText + oldText.substring(end);
            ta.focus();
        };

        element.find('.editor-bold').on('click', function() {
            replaceSelection('**%s**');
        });

        element.find('.editor-italic').on('click', function() {
            replaceSelection('*%s*');
        });
    }

    return {
        restrict: 'A',
        templateUrl: 'directive/text-editor-buttons.html',
        link: link
    };
});
