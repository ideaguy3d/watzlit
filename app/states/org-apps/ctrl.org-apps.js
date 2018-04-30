/**
 * Created by Julius Alvarado on 4/29/2018.
 */

(function () {
    "use strict";

    const app = angular.module('edhubJobsApp');
    app.controller('OrgApplicantsCtrl', ['$rootScope', 'edhubAuthService', 'eOrgListFact',
        OrgApplicantsClass
    ]);

    function OrgApplicantsClass($rootScope, edhubAuthService, eOrgListFact) {

        const vm = this;

        $rootScope.$on("edhub-event-auth-user", function (e, data) {
            var authUser = edhubAuthService.getAuthUser();
            console.log("in 'edhub-event-auth-user' event, The authUser = ", authUser);
            if (authUser) {
                eOrgListFact.getOrgApplicants(authUser.$id).$loaded(function (res) {
                    vm.applicants = res;
                    console.log("edhub - vm.orgApps = ", vm.applicants);
                });
            } else {
                console.log("edhub - There was no authUser :(");
                vm.applicants = null;
            }
        });
    }
}());