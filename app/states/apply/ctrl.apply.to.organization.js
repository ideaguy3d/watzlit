/**
 * Created by Julius Alvarado on 4/22/2018.
 */

(function () {
    "use strict";

    const app = angular.module('edhubJobsApp');
    app.controller('ApplyToOrganizationCtrl', ['$routeParams', ApplyToOrganizationCtrlClass]);

    function ApplyToOrganizationCtrlClass($routeParams) {
        const vm = this;
        vm.rParams = $routeParams;

    }
}());