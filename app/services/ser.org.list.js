/**
 * Created by Julius Alvarado on 4/29/2018.
 */

(function () {
    "use strict";

    angular.module('edhubJobsApp').factory('eOrgListFact', ['$rootScope', '$firebaseArray',
        OrgListClass
    ]);

    function OrgListClass($rootScope, $firebaseArray) {

        const orgListingsRef = firebase.database().ref('orgListings');

        function listOrg(orgInfo, orgId) {
            // TODO: seriously figure out / practice correctly returning this
            return $firebaseArray(orgListingsRef.child(orgId)).$add(orgInfo).then(function (ref) {
                return ref;
            });
        }

        return {
            listOrg: listOrg
        };

    }
}());
