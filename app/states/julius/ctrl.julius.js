/**
 * Created by Julius Alvarado on 12/13/2018.
 */

(function(){
    "use strict";

    const app = angular.module('edhubJobsApp');

    app.controller('Julius Ctrl', ['edhubJobPostService']);

    function JuliusCtrlClass (edhubJobPostService) {
        const vm = this;

        vm.deleteOrg = deleteOrg;

        function deleteOrg () {
            
        }
    }
}());