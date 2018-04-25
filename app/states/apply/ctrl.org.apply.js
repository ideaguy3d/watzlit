/**
 * Created by Julius Alvarado on 4/22/2018.
 */

(function () {
    "use strict";

    const app = angular.module('edhubJobsApp');

    app.controller('ApplyToOrgCtrl', ['orgJobAppsRslv', ApplyToOrganizationClass]);

    function ApplyToOrganizationClass(orgJobAppsRslv) {
        const vm = this;
        //vm.rParams = $routeParams;
        vm.applyToOrgDataModel = {
            applicantName: '',
            applicantEmail: 'no.email@google.com'
        };

        vm.applyToOrg = function () {
            orgJobAppsRslv.$add(vm.applyToOrgDataModel).then(function(res){
                console.log("edhub - The response from firebase:");
                console.log(res);
            });
        };

    }
}());