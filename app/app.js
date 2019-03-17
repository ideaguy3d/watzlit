/**
 * Created by Julius Alvarado on 9/2/2017.
 */

angular
    .module('edhubJobsApp', [
        'firebase',
        'angular-md5',
        'ngRoute',
        'ngMaterial',
        'ngMdIcons',
        'smoothScroll'
    ])
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'states/ycombinator/chat/view.yc-home.html',
                    controller: 'YCombinatorCtrl',
                    controllerAs: 'cycCtrl'
                })
                .when('/ycombinator/chat', {
                    templateUrl: 'states/ycombinator/chat/view.yc-chat.html',
                    controller: 'ycAuthCtrl',
                    controllerAs: 'cycAuth'
                })
                .when('/ycombinator/chat/register', {
                    templateUrl: 'states/ycombinator/chat/view.yc-register.html',
                    controller: 'ycAuthCtrl',
                    controllerAs: 'cycAuth',
                    resolve: {
                        // no authenticated user should go to login/signup view
                        requireNoAuthRslv: function (ycAuthSer, $location) {
                            return ycAuthSer.auth.$requireSignIn()
                                .then(function (authenticatedUserResObj) {
                                    $location.url('/chat');
                                })
                                // the user is not authenticated
                                .catch(function (error) {
                                    return "ERROR = " + error;
                                })
                        }
                    }
                })
                .when('/ycombinator/chat/login', {
                    templateUrl: 'states/ycombinator/chat/view.yc-login.html',
                    controller: 'ycAuthCtrl',
                    controllerAs: 'cycAuth',
                    resolve: {
                        // no authenticated user should go to login/signup view
                        requireNoAuthRslv: function (ycAuthSer, $location) {
                            return ycAuthSer.auth.$requireSignIn().then(function (res) {
                                console.log("__>> user is already authenticated");
                                $location.url('/chat');
                            }).catch(function (error) {
                                return "ERROR = " + error;
                            })
                        }
                    }
                })
                .when('/ycombinator/profile', {
                    templateUrl: 'states/ycombinator/chat/view.profile.html',
                    controller: 'ycProfileCtrl',
                    controllerAs: 'cycProfile',
                    resolve: {
                        authRslv: function ($location, ycUsersSer, ycAuthSer) {
                            // .$requireSignIn() will have an on success cb if there is an authenticated user
                            return ycAuthSer.auth.$requireSignIn().catch(function (error) {
                                console.log('__>> ERROR - tried to go to profile ui state without being authenticated, err = ', error);
                                $location.url('/ycombinator/home');
                            });
                        },
                        profileRslv: function (ycUsersSer, ycAuthSer) {
                            return ycAuthSer.auth.$requireSignIn().then(
                                function (authUserObj) {
                                    // CRITICAL ! CRITICAL !! CRITICAL !!! This is where to put $loaded()
                                    return ycUsersSer.getProfile(authUserObj.uid).$loaded();
                                }
                            );
                        }
                    }
                })
                .when('/landing', {
                    templateUrl: 'states/landing/view.landing.html',
                    controller: 'LandingCtrl',
                    controllerAs: 'landingCtrl'
                })
                .when('/signup', {
                    templateUrl: 'states/auth/view.tab.join.html',
                    controller: 'AuthCtrl',
                    controllerAs: 'signup',
                    resolve: {
                        unauthApplyRslv: function ($route) {
                            // sta = Signup To Apply
                            return $route.current.params.status === "sta"
                                ? "Hi ^_^/ Please signup/login before applying"
                                : null;
                        }
                    }
                })
                .when('/signup2', {
                    templateUrl: 'states/auth/view.signup.html',
                    controller: 'AuthCtrl',
                    controllerAs: 'signup',
                    resolve: {
                        unauthApplyRslv: function ($route) {
                            // sta = Signup To Apply
                            return $route.current.params.status === "sta"
                                ? "Hi ^_^/ Please signup/login before applying"
                                : null;
                        }
                    }
                })
                .when('/signup/:status', {
                    templateUrl: 'states/auth/view.signup.html',
                    controller: 'AuthCtrl',
                    controllerAs: 'signup',
                    resolve: {
                        unauthApplyRslv: function ($route) {
                            // sta = Signup To Apply
                            return $route.current.params.status === "sta"
                                ? "Hi ^_^/ Please signup/login before applying"
                                : null;
                        }
                    }
                })
                .when('/login', {
                    templateUrl: 'states/auth/view.login.html',
                    controller: 'AuthCtrl',
                    controllerAs: 'login',
                    resolve: {
                        unauthApplyRslv: function ($route) {
                            // sta = Signup To Apply
                            return $route.current.params.status === "sta"
                                ? "Hi ^_^/ Please signup/login before applying"
                                : null;
                        }
                    }
                })
                .when('/user-auth-logout/logout-page', {
                    templateUrl: 'states/auth/view.logout.html'
                })
                .when('/profile/:user', {
                    templateUrl: 'states/auth/view.profile.html'
                })
                .when('/post', {
                    templateUrl: 'states/post/view.post.html',
                    controller: 'PostCtrl',
                    controllerAs: 'postJobCtrl'
                })
                .when('/apply', {
                    templateUrl: 'states/apply/view.apply.html',
                    controller: 'ApplyToJobCtrl',
                    controllerAs: 'applyToJobCtrl'
                })
                .when('/apply/:orgId/:orgName', {
                    templateUrl: 'states/apply/view.apply.org.html',
                    controller: 'ApplyToOrgCtrl',
                    controllerAs: 'applyToOrgCtrl',
                    resolve: {
                        orgJobAppsRslv: function ($route, edhubJobPostService) {
                            return edhubJobPostService.forOrg($route.current.params.orgId).$loaded();
                        }
                    }
                })
                .when('/apply-thanks', {
                    templateUrl: 'states/apply/view.thanks.html'
                })
                .when('/apply-job/:orgName/:jobId', {
                    templateUrl: 'states/apply/view.apply.job-org.html',
                    controller: 'ApplyToJobCtrl',
                    controllerAs: 'applyToJobCtrl'
                })
                .when('/applications', {
                    templateUrl: 'states/org-apps/view.org-apps.html',
                    controller: 'OrgApplicantsCtrl',
                    controllerAs: 'orgApps' // cOrgApplicants
                })
                .when('/lab916', {
                    templateUrl: '/states/lab916/view.landing.html'
                })
                .when('/uit1', {
                    templateUrl: 'ui-prac/uit1.html',
                    controller: 'uiPracCtrl',
                    controllerAs: 'ui'
                })
                .when('/view-job/:orgId/:orgName', {
                    templateUrl: 'states/apply/view.view-job.html',
                    controller: 'ApplyToOrgCtrl',
                    controllerAs: 'cApplyToOrg',
                    resolve: {
                        orgJobAppsRslv: function ($route, edhubJobPostService) {
                            console.log('__>> JA - Will return .getOrganization()');
                            return edhubJobPostService.getOrganization($route.current.params.orgId).$loaded();
                        }
                    }
                })
                .when('/julius', {
                    templateUrl: 'states/julius/view.julius.html',
                    controller: 'JuliusCtrl',
                    controllerAs: 'cJulius',
                    resolve: {}
                })
                .when('/chat', {
                    templateUrl: 'states/chat/view.chat.html'
                })
                // go to base url
                .otherwise('/');

            // Initialize Firebase
            const config = {
                apiKey: "AIzaSyDEyWzMw0NPhKUnjWTNsYeqAWazk5cR_LI",
                authDomain: "edhub-jobs.firebaseapp.com",
                databaseURL: "https://edhub-jobs.firebaseio.com",
                projectId: "edhub-jobs",
                storageBucket: "edhub-jobs.appspot.com",
                messagingSenderId: "743478741402"
            };
            firebase.initializeApp(config);
        }
    ]);