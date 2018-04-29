/**
 * Created by Julius Alvarado on 9/12/2017.
 */


(function () {
    "use strict";


    angular.module('edhubJobsApp').controller('PostCtrl', ['$rootScope', 'edhubJobPostService',
        '$location', 'edhubAuthService', 'eOrgListFact',
        PostClass
    ]);

    function PostClass($rootScope, edhubJobPostService, $location, edhubAuthService, eOrgListFact) {

        const vm = this;
        vm.progressMessage = "Your Progress";
        vm.formScope = {};
        vm.edhubAuthUser = !!edhubAuthService.getAuthUser();
        vm.edhubAuthUser = edhubAuthService.getAuthUser();

        //-- data model(s):
        vm.organization = {
            orgName: '',
            zipCode: '',
            email: '',
            aboutTheOrganization: '',
            name: '',
            password: ''
        };

        /* A user has either "signup/login" or logged out */
        $rootScope.$on("edhub-event-auth-user", function (e, data) {
            vm.edhubAuthUser = data.haveAuthUser;
            vm.edhubAuthUserData = edhubAuthService.getAuthUser();
        });

        /* A user has listed their organization without "login/signup" */
        $rootScope.$on("edhub-list-unauth-org-signup", function (e, data) {
            var jProVal = "";
            // to get "node.key" & "node.parent.key"
            eOrgListFact.listOrg(vm.organization, data.orgId).then(function (res) {
                jProVal = res; // thisNode.key or thisNode.parent.key (to ascend up if need be)
                //console.log("edhub - in $rootScope.$on('edhub-list-org-signup'), jProVal =", jProVal);
            });
        });

        vm.setFormScope = function (scope) {
            console.log("jha - form scope has been set, scope =");
            console.log(scope);
            vm.formScope = scope;
        };

        vm.listOrg = function () {
            if (vm.edhubAuthUser) {
                listOrgAuth();
            } else {
                listOrgUnauth();
            }
        };

        var postJob = function () {
            vm.organization.timeStamp = firebase.database.ServerValue.TIMESTAMP;
            edhubJobPostService.jobPostings.$add(vm.organization).then(function (res) {
                console.log("jha - successfully posted job to firebase ^_^/ res=");
                console.log(res);
                vm.organization = {};
            });
            $location.url('/');
        };

        function listOrgAuth() {

        }

        function listOrgUnauth() {
            edhubAuthService.signup(vm.organization, {listOrg: true, path: ''});
            vm.edhubAuthUser = edhubAuthService.getAuthUser();
        }
    }

}());
