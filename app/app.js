/**
 * Created by Julius Alvarado on 9/2/2017.
 */

angular
    .module('edhubJobsApp', [
        'firebase',
        'angular-md5',
        'ngRoute',
        'ngMaterial',
        'ngMdIcons'
    ])
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'states/landing/view.landing.html',
                    controller: 'LandingCtrl',
                    controllerAs: 'landingCtrl'
                })
                .when('/edhub', {
                    templateUrl: 'states/landing/view.landing.html',
                    controller: 'LandingCtrl',
                    controllerAs: 'landing'
                })
                .when('/signup', {
                    url: '/signup',
                    templateUrl: 'states/auth/view.signup.html',
                    controller: 'AuthCtrl',
                    controllerAs: 'signup'
                })
                .when('/login', {
                    templateUrl: 'states/auth/view.login.html',
                    controller: 'AuthCtrl',
                    controllerAs: 'login'
                })
                .when('/post', {
                    templateUrl: 'states/post/view.post.html',
                    controller: 'PostJobCtrl',
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
                    controllerAs: 'applyToOrgCtrl'
                })
                .when('/apply/:organizationName/job/:jobId', {
                    templateUrl: 'states/apply/view.apply.org.job.html',
                    controller: 'ApplyToJobCtrl',
                    controllerAs: 'applyToJobCtrl'
                })
                .when('/lab916', {
                    templateUrl: '/states/lab916/view.landing.html'
                })
                // practice stuff
                .when('/uit1', {
                    templateUrl: 'ui-prac/uit1.html',
                    controller: 'uiPracCtrl',
                    controllerAs: 'ui'
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