/**
 * Created by Julius Alvarado on 4/22/2018.
 */

(function () {
    "use strict";

    const app = angular.module('edhubJobsApp');
    app.controller('ApplyToOrgCtrl', ['$routeParams', ApplyToOrganizationCtrlClass]);

    function ApplyToOrganizationCtrlClass($routeParams) {
        const vm = this;
        vm.rParams = $routeParams;
        vm.applyToOrgDataModel = {
            applicantName: ''
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