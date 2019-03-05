/**
 * Created by Julius Alvarado on 3/4/2019.
 */

(function(){
    'use strict';

    angular.module('edhubJobsApp').controller('YCombinatorCtrl', [
        YCombinatorCtrlClass
    ]);

    function YCombinatorCtrlClass () {
        var vm = this;
        vm.ycombinatorMessage = "Talent Opportunities at Y Combinator";
    }
}());