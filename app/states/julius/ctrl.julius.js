/**
 * Created by Julius Alvarado on 12/13/2018.
 */

(function (GeoFire) {
    "use strict";

    const app = angular.module('edhubJobsApp');

    app.controller('JuliusCtrl', ['edhubJobPostService', JuliusCtrlClass]);

    function JuliusCtrlClass(edhubJobPostService) {
        const vm = this;
        var latitude;
        var longitude;
        vm.deleteOrg = deleteOrg;

        function deleteOrg() {
            // edhubJobPostService.returnAllOrganizations().$remove(1).then(function (res) {
            //     console.log("The item that got deleted = ");
            //     console.log(res);
            // });

            var organizationsList = edhubJobPostService.returnAllOrganizations();
            edhubJobPostService.returnAllOrganizations().$loaded().then(function (res) {
                var organizationItem = organizationsList[1];
                console.log("organizationItem = ", organizationItem);
                organizationsList.$remove(organizationItem);
            });

        }

        function deleteOrg2() {

        }
    }

})();