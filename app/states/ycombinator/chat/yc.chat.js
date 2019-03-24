/**
 * Created by Julius Alvarado on 3/10/2019.
 */
(function () {
    'use strict';
    var yc = '/ycombinator/';

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
        var ref = firebase.database().ref('/channels');
        var channels = $firebaseArray(ref);

        console.log('__>> channels data set,  ', channels);

        return {
            channels: channels
        };
    }

    function SerMessagesClass($firebaseArray) {
        var channelMessagesRef = firebase.database().ref('/channelMessages');
        var userMessagesRef = firebase.database().ref('/userMessages');

        function forChannel(channelId) {
            return $firebaseArray(channelMessagesRef.child(channelId));
        }

        function forUsers(uid1, uid2) {
            var path = uid1 < uid2 ? (uid1 + '/' + uid2) : (uid2 + '/' + uid1);

            return $firebaseArray(userMessagesRef.child(path));
        }

        return {
            forChannel: forChannel,
            forUsers: forUsers
        };
    }

    // CONTROLLERS
    function CtrlAuthClass(ycAuthSer, $location) {
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

    function CtrlProfileClass(
        $location, md5, authRsv, profileRsv, $timeout
    ) {
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

    function CtrlChannelsClass(
        $location, ycAuthSer, ycUsersSer, profileRsv, channelsRsv, ycMessagesSer, ycChannelsSer
    ) {
        const channelsCtrl = this;
        channelsCtrl.messages = null;
        channelsCtrl.channelName = null;
        channelsCtrl.toDisplay = {
            createChannel: 'createChannel',
            messages: 'messages'
        };
        channelsCtrl.window = '';
        channelsCtrl.users = ycUsersSer.all;
        channelsCtrl.profile = profileRsv;
        channelsCtrl.channels = channelsRsv;
        channelsCtrl.newChannel = {
            name: ''
        };

        channelsCtrl.getDisplayName = ycUsersSer.getDisplayName;
        channelsCtrl.getGravatar = ycUsersSer.getGravatar;

        channelsCtrl.switchChannel = function (window) {
            channelsCtrl.window = window;
        };

        /**
         *  Will get messages for either the rooms' messages or direct messages with
         *  other users
         *
         * @param entityId string - could be either a channelID or a userID
         * @param messagesFor
         */
        channelsCtrl.getMessagesFor = function (entityId, messagesFor) {
            channelsCtrl.window = channelsCtrl.toDisplay.messages;

            if (messagesFor === 'forChannel') {
                channelsCtrl.channelName = ycChannelsSer.channels.$getRecord(entityId).name;

                ycMessagesSer.forChannel(entityId).$loaded().then(function (messages) {
                    channelsCtrl.messages = messages;
                })
            } else if (messagesFor === 'forUsers') {
                // get the other users display name
                channelsCtrl.channelName = ycUsersSer.getDisplayName(entityId);

                // the parameter order I'm passing in could be wrong ???
                ycMessagesSer.forUsers(entityId, channelsCtrl.profile.$id).$loaded()
                    .then(function (messages) {
                        channelsCtrl.messages = messages;
                    });
            }
        };

        channelsCtrl.sendMessage = function () {
            var message = channelsCtrl.message;
            var messageData = {
                uid: channelsCtrl.profile.$id,
                body: message,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            };
            if (message.length > 0) {
                channelsCtrl.messages.$add(messageData).then(function () {
                    channelsCtrl.message = '';
                });
            }
        };

        channelsCtrl.createChannel = function () {
            channelsCtrl.channels.$add(channelsCtrl.newChannel)
                .then(function (ref) {
                    channelsCtrl.newChannel = {
                        name: ''
                    };
                    channelsCtrl.getMessagesFor(ref.key, 'forChannel');
                })
                .catch(function (error) {
                    console.log('__>> ERROR - unable to add a channel, error: ', error);
                });
        };

        channelsCtrl.logout = function () {
            ycAuthSer.auth.$signOut()
                .then(function (res) {
                    console.log('__>> Firebase Response from signing out = ', res);
                    $location.url('/ycombinator/home');
                });
        };
    }

    function CtrlMessagesClass(messagesRsv, channelNameRsv, profileRsv) {
        const messagesCtrl = this;
        const profile = profileRsv;

        messagesCtrl.messages = messagesRsv;
        messagesCtrl.channelName = channelNameRsv;
        messagesCtrl.message = '';

        messagesCtrl.sendMessage = function () {
            const message = messagesCtrl.message;
            const messageData = {
                uid: profile.uid,
                body: message,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            };
            if (message.length > 0) {
                messagesCtrl.messages.$add(messageData).then(function () {
                    messagesCtrl.message = '';
                });
            }
        }
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
            'ycAuthSer', '$location', CtrlAuthClass
        ])
        .controller('ycProfileCtrl', [
            '$location', 'md5', 'authRsv', 'profileRsv', '$timeout',
            CtrlProfileClass
        ])
        .controller('ycChannelsCtrl', [
            '$location', 'ycAuthSer', 'ycUsersSer', 'profileRsv', 'channelsRsv',
            'ycMessagesSer', 'ycChannelsSer', CtrlChannelsClass
        ])
        .controller('ycMessagesCtrl', [
            'messagesRsv', 'channelNameRsv', 'profileRsv', CtrlMessagesClass
        ])
    ;
}());