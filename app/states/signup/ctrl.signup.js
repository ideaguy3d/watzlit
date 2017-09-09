/**
 * Created by Julius Alvarado on 9/5/2017.
 */


(function () {
    "use strict";

    angular.module('edhubJobsApp').controller('SignupCtrl', ['edhubAuthService',
        '$state',
        function (edhubAuthService, $state) {
            const vm = this;
            vm.email = "";
            vm.pw = "";

            vm.userSignup = function () {
                edhubAuthService.$createUserWithEmailAndPassword(vm.email, vm.pw)
                    .then(
                        // success
                        function (user) {
                            console.log("success!");
                            console.log(user);
                            $state.go('landing');
                        },
                        // error
                        function (err) {
                            console.log("error...");
                            console.log(err);
                        }
                    )
            }
        }
    ]);
}());