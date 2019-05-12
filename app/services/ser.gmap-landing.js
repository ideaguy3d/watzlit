/**
 * Created by Julius Alvarado on 5/12/2019.
 */

(function () {
    'use strict';

    angular.module('edhubJobsApp').factory('serGmapLanding', [
        '$firebaseArray', GmapLandingSer
    ]);

    function GmapLandingSer($firebaseArray) {
        let storesPracRef = firebase.database().ref().child('storePrac');
        var nodeClubs = $firebaseArray(storesPracRef);

        function getNodeClubs() {
            return nodeClubs;
        }

        return {
            getNodeClubs: getNodeClubs
        }
    }
}());