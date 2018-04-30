/**
 * Created by Julius Alvarado on 9/4/2017.
 */

(function () {
    "use strict";

    angular.module('edhubJobsApp').controller('LandingCtrl', ['edhubJobPostService', '$location', 'smoothScroll',
        function (edhubJobPostService, $location, smoothScroll) {

            const vm = this;
            vm.jobPostBg = "images/chalkboard3dArt1.png";
            vm.showVid = false;

            vm.apply2job = function (organizationName, postId) {
                $location.url('/apply/'+postId+'/'+organizationName);
            };

            vm.go2recentJobs = function(){
                var elem = document.getElementById("edhub-recent-jobs-landing-title");
                smoothScroll(elem);
            };

            activate();

            function activate() {
                edhubJobPostService.jobPostingsLimitTo(7).$loaded().then(function (res) {
                    vm.jobPostings = res;
                    console.log("edhub - jobPostings res =");
                    console.log(typeof res[0]);
                    console.log(res);
                }).catch(function (error) {
                    console.log('Error: ', error);
                });
            }
        }
    ]);
}());