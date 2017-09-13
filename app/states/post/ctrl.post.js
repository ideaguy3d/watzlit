/**
 * Created by Julius Alvarado on 9/12/2017.
 */


angular.module('edhubJobsApp').controller('PostJobCtrl', [
    function () {
        const vm = this;
        vm.organization = {
            name: '',
            location: '',
            email: ''
        };
    }
]);