/**
 * Created by Julius Alvarado on 9/12/2017.
 */


(function () {
    "use strict";


    angular.module('edhubJobsApp').controller('PostCtrl', [
        '$rootScope', 'edhubJobPostService', '$location', 'edhubAuthService', 'OrgListSer',
        PostClass
    ]);

    function PostClass($rootScope, edhubJobPostService, $location, edhubAuthService, eOrgListFact) {
        const vm = this;
        vm.progressMessage = "Your Progress";
        vm.formScope = {};
        vm.edhubAuthUser = !!edhubAuthService.getAuthUser();
        vm.edhubAuthUser = edhubAuthService.getAuthUser();

        //-- Data Model:
        vm.organization = {
            orgName: 'WatzLit',
            zipCode: '95820',
            email: 'php@julius3d.com',
            aboutTheOrganization: 'This job requires these skills:\n' +
                '(1)  ngFire course, \n' +
                '\t\t(2)  ng 1.5 components, \n' +
                '\t\t(3)  jQuery getting started,  \n' +
                '\t\t(4)  bootstrap responsive sites, \n' +
                '\t\t(5)  css transitions, \n' +
                '\t\t(6)  css animations,\n' +
                '\t\t(7)  advanced lea verou course, \n' +
                '\t\t(8)  1/2 the advanced ng spa framework.\n' +
                '\t\t(9)  the VERY ADVANCED ng svg course, \n' +
                '\t\t(10) 11-Transclusion ng fundamentals. \n' +
                '\t\t(12) Angular w/PHP course',
            name: 'Julius Alvarado',
            password: 'abc123'
        };

        /* A user has either "signup/login" or logged out */
        $rootScope.$on("edhub-event-auth-user", function (e, data) {
            vm.edhubAuthUser = data.haveAuthUser;
            vm.edhubAuthUserData = edhubAuthService.getAuthUser();
        });

        /* A user has listed their organization without "login/signup" */
        $rootScope.$on("edhub-list-unauth-org-signup", function (e, data) {
            var jProVal = "";

            // delete vm.organization.password; // this works but causes a weird bug in my code :\

            // to get "node.key" & "node.parent.key"
            eOrgListFact.listOrg(vm.organization, data.orgId).then(function (res) {
                jProVal = res; // thisNode.key or thisNode.parent.key (to ascend upward if need be)
                //console.log("edhub - jProVal =", jProVal);
            });

            // now post to the organization feed so orgs can be easily looped
            eOrgListFact.postToOrgFeed(vm.organization, data.orgId);
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

        vm.postJob = function () {
            console.log("__>> post job should be writing to the db");
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
