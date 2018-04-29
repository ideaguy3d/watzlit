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

        $rootScope.$on("edhub-event-auth-user", function (e, data) {
            vm.edhubAuthUser = data.haveAuthUser;
        });

        //-- data model(s):
        vm.organization = {
            organizationName: '',
            zipCode: '',
            email: '',
            aboutTheOrganization: '',
            repName: '',
            password: ''
        };

        vm.setFormScope = function (scope) {
            console.log("jha - form scope has been set, scope =");
            console.log(scope);
            vm.formScope = scope;
        };

        vm.listOrg = function(){
            if(vm.edhubAuthUser) {
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

        }
    }
]);