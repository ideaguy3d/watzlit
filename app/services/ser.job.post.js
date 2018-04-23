/**
 * Created by Julius Alvarado on 9/17/2017.
 */

(function () {
    "use strict";

    angular.module('edhubJobsApp').factory('edhubJobPostService', ['$firebaseArray',

        function ($firebaseArray) {
            const refJobPostings = firebase.database().ref('jobPostings');


            const jobPostingsLimitTo = function (limit) {
                const qJobPostingsLimitToOrderByDate = refJobPostings.orderByChild("timeStamp").limitToLast(limit);
                return $firebaseArray(qJobPostingsLimitToOrderByDate);
            };

            return {
                jobPostings: $firebaseArray(refJobPostings),
                jobPostingsLimitTo: jobPostingsLimitTo
            };
        }

    ]);
}());


