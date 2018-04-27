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
        $rootScope.rootEdhubAuthUser = "";
        const orgRef = firebase.database().ref('organizations');
        const auth = $firebaseAuth();
        let authApi = {};

        auth.$onAuthStateChanged(function (authUser) {
            if(authUser) {
                let authUserRef = orgRef.child(authUser.uid);
                $rootScope.rootEdhubAuthUser = $firebaseObject(authUserRef);
                console.log("edhub - The Auth User =");
                console.log($rootScope.rootEdhubAuthUser);
                $rootScope.$broadcast("edhub-event-auth-user", {
                    foo: "bar", haveAuthUser: true
                });
            } else {
                $rootScope.rootEdhubAuthUser = "";
                console.log("There is no longer an Auth User");
                console.log($rootScope.rootEdhubAuthUser);
            }
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
                        console.error("edhub - There was an error =");
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
                console.log("edhub - signup() factory user =");
                console.log(user);
                auth.$createUserWithEmailAndPassword(user.email, user.password)
                    .then(function(regUser){
                        orgRef.child(regUser.uid).set({
                            date: firebase.database.ServerValue.TIMESTAMP,
                            regUser: regUser.uid,
                            orgName: user.orgName,
                            email: user.email,
                            repName: user.name
                        });
                        $rootScope.message = "Thanks for registering " + user.name;
                        authApi.login(user);
                    })
                    .catch(function(error){
                        console.error("edhub - There was an error =");
                        console.log(error);
                    });
            },
            getAuthUser: getAuthUser
        };

        function getAuthUser() {
            return $rootScope.rootEdhubAuthUser;
        }

        // return $firebaseAuth();
        return authApi;
    }
}());