/**
 * Created by Julius Alvarado on 9/5/2017.
 */

(function () {
    "use strict";

    angular.module('edhubJobsApp').factory('edhubAuthService', ['$firebaseAuth',
        function ($firebaseAuth) {
            const userSignup = function (email, pw) {
                return $firebaseAuth().$createUserWithEmailAndPassword(email, pw);
            };

            const userLogin = function (email, pw) {
                return $firebaseAuth().$signInWithEmailAndPassword(email, pw);
            };

            // return $firebaseAuth();
            return {
                firebase: $firebaseAuth(),
                userSignup: userSignup,
                userLogin: userLogin
            };
        }
    ]);
}());