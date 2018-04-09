/**
 * Created by Julius Alvarado on 9/4/2017.
 */

(function () {
    "use strict";

    angular.module('edhubJobsApp').controller('LandingCtrl', ['$state',
        function ($state) {
            const vm = this;
            vm.jobPostBg = "images/chalkboard3dArt1.png";
        }
    ]);
}());