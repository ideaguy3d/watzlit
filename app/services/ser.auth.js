/**
 * Created by Julius Alvarado on 9/5/2017.
 */


(function(){
    "use strict";

    angular.module('edhubJobsApp').factory('edhubAuthService', ['$firebaseAuth',
        function($firebaseAuth){
            return $firebaseAuth();
        }
    ]);
}());