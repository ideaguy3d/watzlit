/**
 * Created by Julius Alvarado on 9/4/2017.
 */

(function () {
    "use strict";

    angular.module('edhubJobsApp').controller('LandingCtrl', ['edhubJobPostService',
        function (edhubJobPostService) {
            const vm = this;
            vm.jobPostBg = "images/chalkboard3dArt1.png";

            activate();

            function activate() {
                console.log("edhub - above the async cal data");
                edhubJobPostService.jobPostings.$loaded().then(function(res){
                    vm.jobPostings = res;
                    console.log("edhub - res =");
                    console.log(res);
                }).catch(function(error){
                    console.log('Error: ', error);
                });
            }

        }
    ]);
}());