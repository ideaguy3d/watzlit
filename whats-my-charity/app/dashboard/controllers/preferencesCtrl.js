angular.module('app.dashboard')

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/preferences', {
      templateUrl: 'dashboard/templates/preferences.html',
      controller: 'PreferencesCtrl'
    });
  }])

  .controller('PreferencesCtrl', ['$scope', function($scope) {

  }]);
