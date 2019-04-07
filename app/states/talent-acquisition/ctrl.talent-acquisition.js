/**
 * Created by Julius Alvarado on 4/2/2019.
 */

(function () {
    'use strict';

    function TalentAcquisitionClass(OrgListSer) {
        const vm = this;
        vm.message = 'Talent Acquisition';
        vm.curOrganization = 'Y Combinator';
        vm.hideForm = true;
        vm.postedOpportunities = [];
        vm.talentInfo = {
            name: '',
            email: ''
        };

        vm.talentSubmit = function () {
            if(vm.hideForm === false) {
                console.log('going to sumbit this talent info:');
                console.log(vm.talentInfo);
                vm.talentInfo.curOrganization = vm.curOrganization;
                OrgListSer.ycCreateNewJob(vm.talentInfo).then(function (res) {
                    console.log('Response for listing organization ' + vm.curOrganization);
                    console.log(res);
                })
            }
            vm.hideForm = !vm.hideForm;
        };

        vm.deleteJob = function(job){
            OrgListSer.ycDeleteJobFromOrganization(job);
        };

        init();
        function init () {
            OrgListSer.ycReadFromOrgFeed(10, 'name').$loaded()
                .then(function(res){
                     vm.postedOpportunities = res;
                     console.log("The response is");
                     console.log(res);
                });
        }
    }

    angular.module('edhubJobsApp').controller('TalentAcquisitionCtrl', [
        'OrgListSer', TalentAcquisitionClass
    ]);

}());