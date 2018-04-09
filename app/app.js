/**
 * Created by Julius Alvarado on 9/2/2017.
 */

angular
    .module('edhubJobsApp', [
        'firebase',
        'angular-md5',
        'ui.router',
        'ngMaterial',
        'ngMdIcons'
    ])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('landing', {
                    url: '/',
                    templateUrl: 'states/landing' +
                    '/view.landing.html',
                    controller: 'Lab916Ctrl',
                    controllerAs: 'lab'
                })
                .state('edhub', {
                    url: '/edhub',
                    templateUrl: 'states/landing/view.landing.html',
                    controller: 'LandingCtrl',
                    controllerAs: 'landing'
                })
                .state('signup', {
                    url: '/signup',
                    templateUrl: 'states/auth/view.signup.html',
                    controller: 'AuthCtrl',
                    controllerAs: 'signup'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'states/auth/view.login.html',
                    controller: 'AuthCtrl',
                    controllerAs: 'login'
                })
                .state('post', {
                    url: '/post',
                    templateUrl: 'states/post/view.post.html',
                    controller: 'PostJobCtrl',
                    controllerAs: 'post'
                })
                .state('apply', {
                    url: '/apply',
                    templateUrl: 'states/apply/view.apply.html'
                })
                .state('uit1', {
                    url: '/uit1',
                    templateUrl: 'ui-prac/uit1.html',
                    controller: 'uiPracCtrl',
                    controllerAs: 'ui'
                });

            $urlRouterProvider.otherwise('/');

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