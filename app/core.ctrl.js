/**
 * Created by Julius Alvarado on 9/10/2017.
 */

(function () {
    "use strict";

    angular.module('edhubJobsApp').controller('CoreCtrl', ['$scope', '$mdSidenav', '$mdDialog', '$timeout', CoreCtrlClass]);

    function CoreCtrlClass($scope, $mdSidenav) {
        $scope.ccCurrentUser = "";
        $scope.coreEdhubHorizontalState = false;

        $scope.ccSetCurrentUser = function (userEmail) {
            $scope.ccCurrentUser = userEmail;
        }

        $scope.coreEdhubToggleSideNav = coreEdhubToggleSideNav('core-sidenav');

        function coreEdhubToggleSideNav (componentId) {
            console.log("edhub - coreEdhubToggleSideNav() invoked");
            return function(){
                $mdSidenav(componentId).toggle();
            }
        }

        $scope.coreAuthBoxHidden = false;
        $scope.coreAuthBoxIsOpen = false;
        $scope.coreAuthBoxHover = false;

        // On opening, add a delayed property which shows tooltips after the speed dial has opened
        // so that they have the proper position; if closing, immediately hide the tooltips
        $scope.$watch('demo.isOpen', function(isOpen) {
            if (isOpen) {
                $timeout(function() {
                    $scope.tooltipVisible = $scope.isOpen;
                }, 600);
            } else {
                $scope.tooltipVisible = $scope.isOpen;
            }
        });

        $scope.ccItems = [
            { name: "Login", icon: "login", direction: "bottom" },
            { name: "Edit Profile", icon: "edit", direction: "top" },
            { name: "Settings", icon: "settings", direction: "bottom" }
        ];

        $scope.ccCustomIcons = [
            { name: "Login", icon: "img/icons/twitter.svg", direction: "bottom" },
            { name: "Edit Profile", icon: "img/icons/facebook.svg", direction: "top" },
            { name: "Settings", icon: "img/icons/hangout.svg", direction: "bottom" }
        ];

        $scope.ccOpenDialog = function($event, item) {
            // Show the dialog
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: function($mdDialog) {
                    // Save the clicked item
                    this.item = item;

                    // Setup some handlers
                    this.close = function() {
                        $mdDialog.cancel();
                    };
                    this.submit = function() {
                        $mdDialog.hide();
                    };
                },
                controllerAs: 'dialog',
                templateUrl: 'dialog.html',
                targetEvent: $event
            });
        };
    }
}());