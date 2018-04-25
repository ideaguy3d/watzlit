/**
 * Created by Julius Alvarado on 4/22/2018.
 */

(function () {
    "use strict";

    const app = angular.module('edhubJobsApp');
    app.controller('ApplyToOrgCtrl', ['$routeParams', ApplyToOrganizationClass]);

    function ApplyToOrganizationClass($routeParams) {
        const vm = this;
        vm.rParams = $routeParams;
        vm.applyToOrgDataModel = {
            applicantName: '',
            applicantEmail: ''
        };

        vm.applyToOrg = function(){

        };

        activate();

        function activate() {
            console.log("route params = ");
            console.log($routeParams);
        }
    }
}());