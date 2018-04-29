/**
 * Created by Julius Alvarado on 9/12/2017.
 */


angular.module('edhubJobsApp').controller('PostJobCtrl', ['$rootScope', 'edhubJobPostService',
    '$location', 'edhubAuthService',
    function ($rootScope, edhubJobPostService, $location, edhubAuthService) {
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

        $rootScope.$on("edhub-event-auth-user", function (e, data) {
            vm.edhubAuthUser = data.haveAuthUser;
            vm.edhubAuthUser = edhubAuthService.getAuthUser();
        });

        $rootScope.$on("edhub-list-org-signup", function (e, data) {
            edhubJobPostService.listOrganization(vm.organization, data.orgId);
            console.log("edhub - in $rootScope.$on('edhub-list-org-signup'), hopefully org posted");
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
            console.log("edhub - listOrgUnauth() auth user id = " + vm.edhubAuthUser.$id);
        }
    }
]);