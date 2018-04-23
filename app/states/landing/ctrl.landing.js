/**
 * Created by Julius Alvarado on 9/4/2017.
 */

(function () {
    "use strict";

    angular.module('edhubJobsApp').controller('LandingCtrl', ['edhubJobPostService', '$location',
        function (edhubJobPostService, $location) {
            const vm = this;
            vm.jobPostBg = "images/chalkboard3dArt1.png";

            vm.apply2job = function (organizationName, elem) {
                console.log("edhub - elem =");
                console.log(elem);
                $location.url('/apply/'+organizationName)
            };

            activate();

            function activate() {
                console.log("edhub - above the async cal data");
                edhubJobPostService.jobPostingsLimitTo(3).$loaded().then(function (res) {
                    vm.jobPostings = res;
                    //console.log("edhub - res =");
                    //console.log(res);
                }).catch(function (error) {
                    console.log('Error: ', error);
                });
            }

        }
    ]);
}());