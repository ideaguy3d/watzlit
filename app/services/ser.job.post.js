/**
 * Created by Julius Alvarado on 9/17/2017.
 */

(function () {
    "use strict";

    angular.module('edhubJobsApp').factory('edhubJobPostService', ['$firebaseArray',
        'edhubAuthService', EdhubJobPostClass
    ]);

    function EdhubJobPostClass($firebaseArray, edhubAuthService) {
        const refJobPostings = firebase.database().ref('jobPostings');
        const refOrgApplicants = firebase.database().ref('orgApplicants');

        var jobPostingsLimitTo = function (limit) {
            const qJobPostingsLimitToOrderByDate = refJobPostings.orderByChild("timeStamp").limitToLast(limit);
            return $firebaseArray(qJobPostingsLimitToOrderByDate);
        };

        var listOrganization = function (orgData, orgId) {
            var signupInfo = {
                email: orgData.email,
                pw: orgData.pw ? orgData.pw : null
            };
            // var orgId = edhubAuthService.signup(signupInfo);
            return $firebaseArray(refJobPostings.child(orgId)).$add(orgData).then(function (res) {

            });
        };

        var forOrg = function (orgId) {
            return $firebaseArray(refOrgApplicants.child(orgId));
        };

        return {
            jobPostings: $firebaseArray(refJobPostings),
            jobPostingsLimitTo: jobPostingsLimitTo,
            forOrg: forOrg,
            listOrganization: listOrganization
        };
    }
}());


