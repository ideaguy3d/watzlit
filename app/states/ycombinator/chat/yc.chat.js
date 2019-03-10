/**
 * Created by Julius Alvarado on 3/10/2019.
 */
(function () {
    'use strict';

    // data service class
    function YCombinatorAuthSerClass($firebaseAuth) {
        var auth = $firebaseAuth();

        return {
            auth: auth
        }
    }

    // controller class
    function YCombinatorAuthCtrlClass (ycAuthSer, $location) {
        var authCtrl = this;
        authCtrl.user = {
            email: '',
            password: ''
        };
        
        authCtrl.login = function(){
            ycAuthSer.auth.$signInWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password)
                .then(function(authRes){
                    $location.url('/');
                })
                .catch(function(err){
                    console.log("__>> ERROR:");
                    console.log(err);
                });
        }
    }

    angular.module('edhubJobsApp')
        .factory('ycAuthSer', [
            '$firebaseAuth', YCombinatorAuthSerClass
        ])
        .controller('ycAuthCtrl', [
            'ycAuthSer', '$location', YCombinatorAuthCtrlClass
        ]);
}());