/**
 * Created by Julius Alvarado on 9/11/2017.
 */

(function () {
    "use strict";

    angular.module('edhubJobsApp').controller('AuthCtrl', ['$scope', 'edhubAuthService',
        function ($scope, edhubAuthService) {
            const vm = this;
            vm.email = "";
            vm.pw = "";
            vm.error = "";

            vm.userSignup = function () {
                edhubAuthService.firebase.$createUserWithEmailAndPassword(vm.email, vm.pw)
                    .then(function (auth) {
                        vm.userLogin();
                    }, function (err) {
                        vm.error = err.message;
                    });
            };

            vm.userLogin = function () {
                edhubAuthService.firebase.$signInWithEmailAndPassword(vm.email, vm.pw)
                    .then(function (auth) {
                        $scope.ccSetCurrentUser(auth.email);
                    }, function (err) {
                        vm.error = err.message;
                    });
            };
        }
    ]);
}());