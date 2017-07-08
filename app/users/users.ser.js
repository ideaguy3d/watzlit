/**
 * Created by Julius Alvarado on 2/25/2017.
 */

(function () {
    "use strict";

    angular.module('app').factory('jUsers', function ($firebaseArray, $firebaseObject) {
        var usersRef = firebase.database().ref('users'),
            users = $firebaseArray(usersRef);

        return {
            getProfile: function(uid){
                return $firebaseObject(usersRef.child(uid));
            },
            getDisplayName: function(uid) {
                var rec = users.$getRecord(uid);
                console.log(rec);
                return rec.displayName;
            },
            all: users,
            getGravatar: function(uid) {
                return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
            }
        };
    });
}());