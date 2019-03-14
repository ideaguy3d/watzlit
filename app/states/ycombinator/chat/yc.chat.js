/**
 * Created by Julius Alvarado on 3/10/2019.
 */
(function () {
    'use strict';

    // data service class's 
    function YCombinatorAuthSerClass($firebaseAuth) {
        var auth = $firebaseAuth();

        return {
            auth: auth
        }
    }

    function YCombinatorUsersSerClass($firebaseArray, $firebaseObject) {
        var refUsers = firebase.database().ref('/users');
        var users = $firebaseArray(refUsers);

        function getProfile(uid) {
            return $firebaseObject(refUsers.child(uid));
        }

        function getDisplayName(uid) {
            return users.$getRecord(uid).displayName;
        }

        return {
            getProfile: getProfile,
            getDisplayName: getDisplayName,
            all: users
        };
    }

    // controller class's 
    function YCombinatorAuthCtrlClass(ycAuthSer, $location) {
        var authCtrl = this;
        authCtrl.error = '';
        authCtrl.authInfo = 'The auth ctrl is wired up to the view';
        authCtrl.user = {
            email: '',
            password: ''
        };

        authCtrl.login = function () {
            ycAuthSer.auth.$signInWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password)
                .then(function (authRes) {
                    $location.url('/');
                })
                .catch(function (error) {
                    console.log("__>> ERROR:");
                    console.log(error);
                    authCtrl.error = error;
                });
        };

        authCtrl.register = function () {
            console.log('__>> should invoke YC auth service');
            ycAuthSer.auth.$createUserWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password)
                .then(function (userRes) {
                    $location.url('/');
                    console.log('__>> should sign user up with this info');
                    console.log(authCtrl.user);
                })
                .catch(function (error) {
                    authCtrl.error = error;
                    console.log('__>> ERROR: ' + error);
                });
        }
    }

    function YCombinatorProfileCtrlClass ($location, md5, authRslv, profileRslv) {
        var profileCtrl = this;
    }
    
    angular.module('edhubJobsApp')
        .factory('ycAuthSer', [
            '$firebaseAuth', YCombinatorAuthSerClass
        ])
        .factory('ycUsersSer', [
            '$firebaseArray', '$firebaseObject', YCombinatorUsersSerClass
        ])
        .controller('ycAuthCtrl', [
            'ycAuthSer', '$location', YCombinatorAuthCtrlClass
        ])
        .controller('ycProfileCtrl', [
            '$location', 'md5', 'authRslv', 'profileRslv', YCombinatorProfileCtrlClass
        ])
    ;
}());