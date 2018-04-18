/**
 * Created by Julius Alvarado on 9/4/2017.
 */

(function () {
    "use strict";

    angular.module('edhubJobsApp').controller('LandingCtrl', ['edhubJobPostService',
        function (edhubJobPostService) {
            const vm = this;
            vm.jobPostBg = "images/chalkboard3dArt1.png";

            console.log("edhub - above the async cal data");
            edhubJobPostService.$loaded().then(function(res){
                vm.jobPostings = res.data;
                console.log("edhub - the data");
                console.log(res.data);
            }).catch(function(error){
                console.log('Error: ', error);
            })
        }
    ]);
}());