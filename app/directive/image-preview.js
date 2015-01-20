angular.module('app.directives').directive('imagePreview',
    function($window, $document) {
        function link (scope, element, attrs) {
            var togglePreview = function(element) {
                var preview = $(element).find('img.preview');

                if (preview.length)
                {
                    $(preview).toggle();
                    return;
                }

                var html = '<img src="'+ element.href +'" class="preview">';
                $(element).append(html);
            };

            element.on('click', 'a.image', function(event) {
                event.preventDefault();
                togglePreview(this);
            });
        }

        return {
            restrict: 'A',
            link: link
        };
    });
