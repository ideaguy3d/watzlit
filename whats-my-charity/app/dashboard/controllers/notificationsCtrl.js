angular.module('app.dashboard')

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/notifications', {
      templateUrl: 'dashboard/templates/notifications.html',
      controller: 'NotificationsCtrl'
    });
  }])

  .controller('NotificationsCtrl', ['$scope', function($scope) {

  }]);
