/**
 * Created by Julius Alvarado on 4/22/2018.
 */

(function () {
    "use strict";

    const app = angular.module('edhubJobsApp');
    app.controller('ApplyToOrgCtrl', ['$routeParams', 'edhubJobPostService', ApplyToOrganizationClass]);

    function ApplyToOrganizationClass($routeParams, edhubJobPostService) {
        const vm = this;
        vm.rParams = $routeParams;
        vm.applyToOrgDataModel = {
            applicantName: '',
            applicantEmail: ''
        };

        vm.applyToOrg = function(){
            edhubJobPostService.forOrg($routeParams.orgId).$loaded().then(function(res){
                console.log("the response from firebasedb");
                console.log(res);
            });
        };

        activate();

        function activate() {
            console.log("route params = ");
            console.log($routeParams);
        }
    }
}());