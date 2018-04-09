/**
 * Created by Julius Alvarado on 9/10/2017.
 */


(function () {
    "use strict";

    angular.module('edhubJobsApp').controller('CoreCtrl', ['$scope',
        function ($scope) {
            $scope.ccCurrentUser = "";
            $scope.coreEdhubHorizontalState = false;

            $scope.ccSetCurrentUser = function(userEmail){
                $scope.ccCurrentUser = userEmail;
            }
        }
    ]);
}());