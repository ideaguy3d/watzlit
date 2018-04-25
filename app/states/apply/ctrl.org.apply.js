/**
 * Created by Julius Alvarado on 4/22/2018.
 */

(function () {
    "use strict";

    const app = angular.module('edhubJobsApp');

    app.controller('ApplyToOrgCtrl', ['orgJobAppsRslv', '$routeParams', ApplyToOrganizationClass]);

    function ApplyToOrganizationClass(orgJobAppsRslv, $routeParams) {
        const vm = this;
        vm.rParams = $routeParams;
        vm.applyToOrgDataModel = {
            applicantName: '',
            applicantEmail: '',
            applicantLinkedin: '',
            applicantCover: '',
            orgApplyTo: $routeParams.orgName,
            orgId: $routeParams.orgId
        };

        vm.applyToOrg = function () {
            orgJobAppsRslv.$add(vm.applyToOrgDataModel).then(function(res){
                console.log("edhub - The response from firebase:");
                console.log(res);
            }).catch(function(err){
                console.log("There was an error submitting applicant data to organization:");
                console.log(err);
            });
        };

    }
}());