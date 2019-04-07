/**
 * Created by Julius Alvarado on 4/29/2018.
 */

(function () {
    'use strict';

    angular.module('edhubJobsApp').factory('OrgListSer', [
        '$rootScope', '$firebaseArray', OrgListSerClass
    ]);

    function OrgListSerClass($rootScope, $firebaseArray) {
        const orgListingsRef = firebase.database().ref('orgListings');
        const orgFeedRef = firebase.database().ref('orgFeed');
        const ycOrgFeedRef = firebase.database().ref('ycOrgFeed');
        const orgApplicantsRef = firebase.database().ref('orgApplicants');

        /**
         *
         * @param orgInfo
         * @param orgId
         * @returns {*}
         */
        function listOrg(orgInfo, orgId) {
            return $firebaseArray(orgListingsRef.child(orgId)).$add(orgInfo)
                .then(function (ref) {
                    return ref;
                });
        }

        function postToOrgFeed(orgInfo, orgId) {
            orgInfo.timestamp = firebase.database.ServerValue.TIMESTAMP;
            orgInfo.orgId = orgId;
            return $firebaseArray(orgFeedRef).$add(orgInfo)
                .then(function (refNode) {
                    return refNode;
                });
        }

        function readFromOrgFeed(limit, orderFeedBy) {
            var qOrderLimit = orgFeedRef.orderByChild(orderFeedBy).limitToLast(limit);
            return $firebaseArray(qOrderLimit);
        }

        function getOrgApplicants(edhubUserId) {
            return $firebaseArray(orgApplicantsRef.child(edhubUserId));
        }

        function ycCreateNewJob (jobInfo) {
            $firebaseArray(ycOrgFeedRef).$add(jobInfo);
        }

        function ycReadFromOrgFeed(limit, orderFeedBy) {
            var qOrderLimit = ycOrgFeedRef.orderByChild(orderFeedBy).limitToLast(limit);
            return $firebaseArray(qOrderLimit);
        }

        function ycUpdateJobPost (jobInfo) {

        }

        function ycDeleteJobFromOrganization (jobInfo) {
            $firebaseArray.$remove(jobInfo.$id);
        }

        return {
            listOrg: listOrg,
            postToOrgFeed: postToOrgFeed,
            readFromOrgFeed: readFromOrgFeed,
            getOrgApplicants: getOrgApplicants,
            ycReadFromOrgFeed: ycReadFromOrgFeed,
            ycDeleteJobFromOrganization: ycDeleteJobFromOrganization,
            ycCreateNewJob: ycCreateNewJob,
            ycUpdateJobPost: ycUpdateJobPost
        };

    }
}());
