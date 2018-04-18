/**
 * Created by Julius Alvarado on 9/10/2017.
 */

(function () {
    "use strict";

    angular.module('edhubJobsApp').controller('CoreCtrl', ['$scope', '$mdSidenav',
        function ($scope, $mdSidenav) {
            $scope.ccCurrentUser = "";
            $scope.coreEdhubHorizontalState = false;

            $scope.ccSetCurrentUser = function (userEmail) {
                $scope.ccCurrentUser = userEmail;
            }

            $scope.coreEdhubToggleSideNav = coreEdhubToggleSideNav('core-sidenav');

            function coreEdhubToggleSideNav (componentId) {

                return function(){
                    $mdSidenav(componentId).toggle();
                }
            }
        }
    ]);
}());