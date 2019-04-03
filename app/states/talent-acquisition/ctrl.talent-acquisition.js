/**
 * Created by Julius Alvarado on 4/2/2019.
 */

(function(){
    'use strict';

    function TalentAcquisitionClass () {
        const vm = self;
        vm.message = 'joined hard cable'
        vm.hideForm = true;
    }

    angular.module('edhubJobsApp').controller('TalentAcquisitionCtrl', [
        TalentAcquisitionClass
    ]);
}());