/**
 * Created by Julius Alvarado on 12/13/2018.
 */

(function () {
    "use strict";

    const app = angular.module('edhubJobsApp');

    app.controller('JuliusCtrl', ['edhubJobPostService', JuliusCtrlClass]);

    function JuliusCtrlClass(edhubJobPostService) {
        const vm = this;

        vm.deleteOrg = deleteOrg;

        function deleteOrg() {
            console.log("delete org button pressed.");
            let allOrgnanizations = edhubJobPostService.returnAllOrganizations();
           edhubJobPostService.returnAllOrganizations().$remove(2).then(function(res){
               console.log("The item that got deleted = ");
               console.log(res);
            });
            edhubJobPostService.returnAllOrganizations().$loaded().then(function(res){
                console.log("response from .returnAllOrgs()");
                console.log(res);
            })
        }
    }
}());