angular.module('app.dashboard')
  .controller('AlertsCtrl', ['$scope', function($scope) {
    $scope.alerts = [{
      type: 'success',
      msg: 'Welcome to your Dashboard! Below you will find your recommended charities and more!'
    }];

    $scope.addAlert = function() {
      $scope.alerts.push({
        msg: 'Another alert!'
      });
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  }]);