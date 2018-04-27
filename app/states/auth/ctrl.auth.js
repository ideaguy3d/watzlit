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
            vm.name = "";
            vm.orgName = "";
            
            vm.orgSignupDataModel = {};

            vm.authSignup = function(){
                const orgInfo = {
                    email: vm.email,
                    password: vm.pw,
                    orgName: vm.orgName !== "" ? vm.orgName : "no orgName input field yet :/",
                    name: vm.name !== "" ? vm.name : "no name given"
                };
                edhubAuthService.signup(orgInfo);
            };

            // old
            vm.userSignup = function () {
                edhubAuthService.firebase.$createUserWithEmailAndPassword(vm.email, vm.pw)
                    .then(function (auth) {
                        vm.userLogin();
                    }, function (err) {
                        vm.error = err.message;
                    });
            };
            // old
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