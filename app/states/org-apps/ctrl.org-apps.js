/**
 * Created by Julius Alvarado on 4/29/2018.
 */

(function () {
    "use strict";

    const app = angular.module('edhubJobsApp');
    app.controller('OrgApplicantsCtrl', ['edhubAuthService', 'eOrgListFact',
        OrgApplicantsClass
    ]);

    function OrgApplicantsClass(edhubAuthService, eOrgListFact) {

        const vm = this;

        activate();

        function activate() {
            var authUser = edhubAuthService.getAuthUser();
            console.log("The authUser = ", authUser);
            if(authUser) {
                eOrgListFact.getOrgApplicants(authUser.$id).$loaded(function(res){
                    vm.applicants = res;
                    console.log("edhub - vm.orgApps = ", vm.applicants);
                });
            } else {
                console.log("edhub - There was no authUser :(");
                vm.applicants = null;
            }
        }
    }
}());