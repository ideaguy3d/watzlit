(function () {
    'use strict';
    var directive = ['$animate', function ($animate) {
        function link($scope, $element, $attrs) {
            $scope.dismiss = function () {
                var height = $element[0].offsetHeight;
                var promise = $animate.leave($element, {
                    to: {
                        'margin-bottom': -height + 'px'
                    }
                });

                promise.then(function () {
                    $scope.$apply(function () {
                        $scope.close();
                    });
                });
            };
        }

        return  {
            restrict: 'EA',
            templateUrl: 'global/templates/alert.html',
            transclude: true,
            replace: true,
            scope: {
                type: '@',
                close: '&'
            },
            link: link
        };
    }];

    angular.module('app.global')
        .directive('wmcAlert', directive);
})();