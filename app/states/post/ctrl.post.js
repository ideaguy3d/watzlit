/**
 * Created by Julius Alvarado on 9/12/2017.
 */


angular.module('edhubJobsApp').controller('PostJobCtrl', ['edhubJobPostService',
    function (edhubJobPostService) {
        const vm = this;
        vm.progressMessage = "Your Progress";
        vm.formScope = {};

        //-- data models:
        vm.organization = {
            organizationName: '',
            zipCode: '',
            email: ''
        };

        vm.setFormScope = function (scope) {
            console.log("jha - form scope has been set, scope =");
            console.log(scope);
            vm.formScope = scope;
        };

        vm.postJob = function () {
            edhubJobPostService.jobPostings.$add(vm.organization).then(function (res) {
                console.log("jha - successfully posted job to firebase ^_^/ res=");
                console.log(res);
                vm.organization = {};
            });
        };
    }
]);