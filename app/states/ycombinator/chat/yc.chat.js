/**
 * Created by Julius Alvarado on 3/10/2019.
 */
(function () {
    'use strict';

    // SERVICES
    function SerAuthClass($firebaseAuth) {
        var auth = $firebaseAuth();

        return {
            auth: auth
        }
    }

    function SerUsersClass($firebaseArray, $firebaseObject) {
        var refUsers = firebase.database().ref('/users');
        var users = $firebaseArray(refUsers);

        function getProfile(uid) {
            return $firebaseObject(refUsers.child(uid));
        }

        function getDisplayName(uid) {
            return users.$getRecord(uid).displayName;
        }

        function getGravatar(uid) {
            return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
        }

        return {
            getProfile: getProfile,
            getDisplayName: getDisplayName,
            getGravatar: getGravatar,
            all: users
        };
    }

    function SerChannelsClass($firebaseArray) {
        var ref = firebase.database().ref('channels');
        var channels = $firebaseArray(ref);

        console.log('__>> channels data set,  ', channels);

        return {
            channels: channels
        };
    }

    function SerMessagesClass($firebaseArray) {
        var channelMessagesRef = firebase.database().ref('channelMessages');

        function forChannel(channelId) {
            return $firebaseArray(channelMessagesRef.child(channelId));
        }

        return {
            forChannel: forChannel
        };
    }

    // CONTROLLERS
    function AuthCtrlClass(ycAuthSer, $location) {
        var authCtrl = this;
        authCtrl.error = '';
        authCtrl.authInfo = 'The auth ctrl is wired up to the view';
        authCtrl.user = {
            email: '',
            password: ''
        };

        authCtrl.login = function () {
            ycAuthSer.auth.$signInWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password)
                .then(function (authRes) {
                    $location.url('/');
                })
                .catch(function (error) {
                    console.log("__>> ERROR:");
                    console.log(error);
                    authCtrl.error = error;
                });
        };

        authCtrl.register = function () {
            console.log('__>> should invoke YC auth service');
            ycAuthSer.auth.$createUserWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password)
                .then(function (userRes) {
                    $location.url('/');
                    console.log('__>> should sign user up with this info');
                    console.log(authCtrl.user);
                })
                .catch(function (error) {
                    authCtrl.error = error;
                    console.log('__>> ERROR: ' + error);
                });
        }
    }

    function ProfileCtrlClass($location, md5, authRsv, profileRsv, $timeout) {
        var profileCtrl = this;
        profileCtrl.updateProfileFeedback = '';
        // this simply returns the username of the profile
        profileCtrl.profile = profileRsv;

        profileCtrl.updateProfile = function () {
            profileCtrl.profile.emailHash = md5.createHash(authRsv.email);
            profileCtrl.profile.$save();
            profileCtrl.updateProfileFeedback = 'Username saved ^_^';
            $timeout(function () {
                profileCtrl.updateProfileFeedback = '';
                $location.url('/ycombinator/channels');
            }, 1000);
        };
    }

    function ChannelsCtrlClass($location, ycAuthSer, ycUsersSer, profilesRsv, channelsRsv) {
        var channelsCtrl = this;
        channelsCtrl.messages = null;
        channelsCtrl.channelsToDisplay = {
            createChannel: false
        };

        channelsCtrl.profile = profilesRsv;
        channelsCtrl.channels = channelsRsv;

        channelsCtrl.newChannel = {
            name: ''
        };

        channelsCtrl.getDisplayName = ycUsersSer.getDisplayName;
        channelsCtrl.getGravatar = ycUsersSer.getGravatar;

        channelsCtrl.switchChannel = function (channelId) {
            channelsCtrl.messages = 'messages for channel id =' + channelId;
        };

        channelsCtrl.getMessagesFor = function (channelId) {
            // will be making a new messages service
        };

        channelsCtrl.showCreateChannel = function (boolVal) {
            channelsCtrl.channelsToDisplay.createChannel = boolVal;
        };

        channelsCtrl.createChannel = function () {
            channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function () {
                channelsCtrl.newChannel = {
                    name: ''
                };
            });
        };

        channelsCtrl.logout = function () {
            ycAuthSer.auth.$signOut().then(function (res) {
                console.log('__>> Firebase Response from signing out = ', res);
                $location.url('/ycombinator/home');
            });
        };
    }

    angular.module('edhubJobsApp')
        .factory('ycAuthSer', [
            '$firebaseAuth', SerAuthClass
        ])
        .factory('ycUsersSer', [
            '$firebaseArray', '$firebaseObject', SerUsersClass
        ])
        .factory('ycChannelsSer', [
            '$firebaseArray', SerChannelsClass
        ])
        .factory('ycMessagesSer', [
            '$firebaseArray', SerMessagesClass
        ])
        // CONTROLLERS
        .controller('ycAuthCtrl', [
            'ycAuthSer', '$location', AuthCtrlClass
        ])
        .controller('ycProfileCtrl', [
            '$location', 'md5', 'authRsv', 'profileRsv', '$timeout',
            ProfileCtrlClass
        ])
        .controller('ycChannelsCtrl', [
            '$location', 'ycAuthSer', 'ycUsersSer', 'profileRsv', 'channelsRsv',
            ChannelsCtrlClass
        ])
    ;
}());