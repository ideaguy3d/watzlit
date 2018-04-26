/**
 * Created by Julius Alvarado on 9/5/2017.
 */

(function () {
    "use strict";

    angular.module('edhubJobsApp').factory('edhubAuthService', ['$firebaseAuth', '$rootScope',
        '$firebaseObject', '$location',
        EdhubAuthClass
    ]);

    function EdhubAuthClass($firebaseAuth, $rootScope, $firebaseObject, $location) {
        $rootScope.edhubAuthUser = "";
        const orgRef = firebase.database().ref('organizations');
        const auth = $firebaseAuth();
        let authApi = {};

        auth.$onAuthStateChanged(function (authUser) {

        });

        authApi = {
            login: function (user) {
                auth.$signInWithEmailAndPassword(user.email, user.password)
                    .then(function (user) {
                        console.log("edhub - user successfully signed in");
                        console.log(user);
                        $location.path('/');
                    })
                    .catch(function (error) {
                        console.error("edhub - There was an error:")
                        console.log(error);
                        $rootScope.authError = error.message;
                    });
            },
            logout: function () {
                return auth.$signOut();
            },
            requireAuth: function () {
                return auth.requireSignIn();
            },
            signup: function (user) {
                auth.$createUserWithEmailAndPassword(user.email, user.password)
                    .then(function(regUser){
                        orgRef.child(regUser.uid).set({
                            date: firebase.database.ServerValue.TIMESTAMP,
                            regUser: regUser.uid,
                            orgName: user.orgName,
                            email: user.email
                        });
                        $rootScope.message = "Thanks for registering " + user.name;
                        authApi.login(user);
                    })
                    .catch(function(error){
                        console.error("edhub - There was an error =");
                        console.log(error);
                    });
            }
        };

        const userSignup = function (email, pw) {
            return $firebaseAuth().$createUserWithEmailAndPassword(email, pw);
        };

        const userLogin = function (email, pw) {
            return $firebaseAuth().$signInWithEmailAndPassword(email, pw);
        };

        // return $firebaseAuth();
        return authApi;
    }
}());