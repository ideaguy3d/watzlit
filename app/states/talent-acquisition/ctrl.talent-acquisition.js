/**
 * Created by Julius Alvarado on 4/2/2019.
 */

(function () {
    'use strict';

    function TalentAcquisitionClass(eOrgListFact) {
        const vm = this;
        vm.message = 'Talent Acquisition';
        vm.curOrganization = 'Y Combinator';
        vm.hideForm = true;
        vm.talentInfo = {
            name: '',
            email: ''
        };

        vm.talentSubmit = function () {
            if(vm.hideForm === false) {
                console.log('going to sumbit this talent info:');
                console.log(vm.talentInfo);
                eOrgListFact.listOrg(vm.talentInfo, vm.curOrganization).then(function (res) {
                    console.log('Response for listing organization ' + vm.curOrganization);
                    console.log(res);
                })
            }
            vm.hideForm = !vm.hideForm;
        }
    }

    angular.module('edhubJobsApp').controller('TalentAcquisitionCtrl', [
        'eOrgListFact', TalentAcquisitionClass
    ]);
}());