/**
 * Created by Julius Alvarado on 9/5/2017.
 */


(function () {
    "use strict";

    angular.module('edhubJobsApp').controller('SignupCtrl', ['firebaseAuthService',
        function (firebaseAuthService) {
            const vm = this;
            vm.email = "";
            vm.pw = "";

            vm.userSignup = function(){
                console.log("user has signed up ^_^");
            }
        }
    ]);
}());