/**
 * Created by Julius Alvarado on 8/11/2017.
 */
(function () {
    "use strict";

    angular.module('app.global').animation('.j-animate-fade-in-out', ['$window',
        function ($window) {
            /*function animate(element, property, start, end, time, units, callback) {
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
            }*/ // END OF: animate()
            var duration = 1;
            return {
                enter: function (element, done) {
                    // animate(element[0], 'opacity', 0, 1, 1000, null, done);
                    TweenMax.from(element, duration, {
                       opacity: 0,
                        x: '-100%',
                        ease: Back.easeOut,
                        onComplete: done
                    });
                },
                leave: function (element, done) {
                    // animate(element[0], 'opacity', 1, 0, 1000, null, done);
                    TweenMax.to(element, duration, {
                        opacity: 0,
                        x: '-100%',
                        ease: Back.easeIn,
                        onComplete: done
                    });

                    var width = element[0].offsetWidth;
                    var delay = duration * .3;
                    console.log("element[0] = ");
                    console.log(element[0]);
                    TweenMax.to(element, duration-delay, {
                        marginRight: -width,
                        delay: delay,
                        ease: Power4.easeIn,
                        onComplete: done
                    });
                }
            }
        }]);
}());