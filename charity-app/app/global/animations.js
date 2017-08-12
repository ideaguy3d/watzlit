/**
 * Created by Julius Alvarado on 8/11/2017.
 */
(function () {
    "use strict";

    angular.module('app.global').animation('.j-animate-fade-in-out', ['$window',
        function ($window) {
            function animate(element, property, start, end, time, units, callback) {
                units = units || '';
                var frameRate = 1/16;
                var delta = (end - start) / time / frameRate;
                var value = start;
                var interval = setInterval(function(){
                    $window.requestAnimationFrame(execute);
                    if(stop(value, start, end)) {
                        clearInterval(interval);
                        callback();
                    }
                }, 1 / frameRate);
                function stop(value, start, end) {
                    return start < end ? value >= end : value <= end;
                }
                function execute() {
                    value += delta;
                    element.style[property] = value + units;
                }
            } // END OF: animate()

            return {
                enter: function (element, done) {
                    animate(element[0], 'opacity', 0, 1, 1000, null, done);
                },
                leave: function (element, done) {
                    animate(element[0], 'opacity', 1, 0, 1000, null, done);
                }
            }
        }]);
}());