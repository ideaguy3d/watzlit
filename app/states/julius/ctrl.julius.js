/**
 * Created by Julius Alvarado on 12/13/2018.
 */

(function (GeoFire) {
    'use strict';

    const app = angular.module('edhubJobsApp');

    app.controller('JuliusCtrl', ['edhubJobPostService', JuliusCtrlClass]);

    function JuliusCtrlClass(edhubJobPostService) {
        const vm = this;
        var latitude;
        var longitude;
        vm.deleteOrg = deleteOrg;

        function deleteOrg() {
            // edhubJobPostService.returnAllOrganizations().$remove(1).then(function (res) {
            //     console.log("The item that got deleted = ");
            //     console.log(res);
            // });

            var organizationsList = edhubJobPostService.returnAllOrganizations();
            edhubJobPostService.returnAllOrganizations().$loaded().then(function (res) {
                var organizationItem = organizationsList[1];
                console.log("organizationItem = ", organizationItem);
                organizationsList.$remove(organizationItem);
            });

        }

        // Generate a random Firebase location
        var firebaseRef = firebase.database().ref().child('mapPrac').push();
        // Create a new GeoFire instance at the random Firebase location
        var geoFire = new GeoFire(firebaseRef);

        /* Callback method from the geolocation API which receives the current user's location */
        var geolocationCallback = function (location) {
            latitude = location.coords.latitude;
            longitude = location.coords.longitude;
            log("Retrieved user's location: [" + latitude + ", " + longitude + "]");

            var username = "Julius";
            geoFire.set(username, [latitude, longitude]).then(function () {
                log("Current user " + username + "'s location has been added to GeoFire");

                // When the user disconnects from Firebase (e.g. closes the app, exits the browser),
                // remove their GeoFire entry
                firebaseRef.child(username).onDisconnect().remove();

                log("Added handler to remove user " + username + " from GeoFire when you leave this page.");

                myMap();
            }).catch(function (error) {
                log("Error adding user " + username + "'s location to GeoFire");
            });
        };

        /* Handles any errors from trying to get the user's current location */
        var errorHandler = function (error) {
            if (error.code === 1) {
                log("Error: PERMISSION_DENIED: User denied access to their location");
            } else if (error.code === 2) {
                log("Error: POSITION_UNAVAILABLE: Network is down or positioning satellites cannot be reached");
            } else if (error.code === 3) {
                log("Error: TIMEOUT: Calculating the user's location too took long");
            } else {
                log("Unexpected error code")
            }
        };

        /* Uses the HTML5 geolocation API to get the current user's location */
        var getLocation = function () {
            if (typeof navigator !== "undefined" && typeof navigator.geolocation !== "undefined") {
                log("Asking user to get their location");
                navigator.geolocation.getCurrentPosition(geolocationCallback, errorHandler);
            } else {
                log("Your browser does not support the HTML5 Geolocation API, so this demo will not work.")
            }
        };

        // Get the current user's location
        getLocation();

        /* Logs to the page instead of the console */
        function log(message) {
            var childDiv = document.createElement("div");
            var textNode = document.createTextNode(message);
            childDiv.appendChild(textNode);
            document.getElementById("log").appendChild(childDiv);
        }

        //-- Google Maps code:
        function myMap() {
            var mapProp = {
                center: new google.maps.LatLng(latitude, longitude),
                zoom: 15,
            };

            var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
            var marker = new google.maps.Marker({position: mapProp.center});
            marker.setMap(map);

            console.log('__>> map:');
            console.log(map);
        }
    }

})(window.geofire.GeoFire);