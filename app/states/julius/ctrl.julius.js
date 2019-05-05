/**
 * Created by Julius Alvarado on 12/13/2018.
 */

(function (GeoFire) {
    'use strict';

    const app = angular.module('edhubJobsApp');

    app.controller('JuliusCtrl', ['edhubJobPostService', '$location', JuliusCtrlClass]);

    function JuliusCtrlClass(edhubJobPostService, $location) {
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

        // Style credit: https://snazzymaps.com/style/1/pale-dawn
        const mapStyle1 = [
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": 33
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2e5d4"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c5dac6"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c5c6c6"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e4d7c6"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#fbfaf7"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#acbcc9"
                    }
                ]
            }
        ];

        const mapStyle = [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                ]
            }
        ];

        // Escapes HTML characters in a template literal string, to prevent XSS.
        // See https://www.owasp.org/index.php/XSS_%28Cross_Site_Scripting%29_Prevention_Cheat_Sheet#RULE_.231_-_HTML_Escape_Before_Inserting_Untrusted_Data_into_HTML_Element_Content
        function sanitizeHTML(strings) {
            const entities = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
            let result = strings[0];
            for (let i = 1; i < arguments.length; i++) {
                result += String(arguments[i]).replace(/[&<>'"]/g, (char) => {
                    return entities[char];
                });
                result += strings[i];
            }
            return result;
        }

        /* Callback method from the geolocation API which receives the current user's location */
        var geolocationCallback = function (location) {
            latitude = location.coords.latitude;
            longitude = location.coords.longitude;
            console.log("Retrieved user's location: [" + latitude + ", " + longitude + "]");

            var username = "Julius";
            geoFire.set(username, [latitude, longitude])
                .then(function () {
                    console.log("Current user " + username + "'s location has been added to GeoFire");

                    // When the user disconnects from Firebase (e.g. closes the app, exits the browser),
                    // remove their GeoFire entry
                    firebaseRef.child(username).onDisconnect().remove();

                    var currentUrl = $location.url();

                    console.log("Added handler to remove user " + username + " from GeoFire when you leave this page.");
                    console.log("__>> $location.url() = " + currentUrl);

                    if (currentUrl === '/') {
                        myMap();
                    } else if(currentUrl === '/2') {
                        initMap();
                    }
                    else {
                        // just go to the home view
                        $location.url('/');
                    }

                })
                .catch(function (error) {
                    log("Error adding user " + username + "'s location to GeoFire");
                    console.log("Error adding user " + username + "'s location to GeoFire, ERROR:", error);
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
                console.log("Asking user to get their location");
                navigator.geolocation.getCurrentPosition(geolocationCallback, errorHandler);
            } else {
                console.log("Your browser does not support the HTML5 Geolocation API, so this demo will not work.")
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

        function initMap () {
            //TODO: cache the gmap object
            const map = new google.maps.Map()
        }

        //-- Google Maps code:
        function myMap() {
            var mapProp = {
                center: new google.maps.LatLng(latitude, longitude),
                zoom: 15,
                //controlSize: 0,
                //disableDefaultUI: true
            };

            var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
            var marker = new google.maps.Marker({position: mapProp.center});
            marker.setMap(map);

            console.log('__>> Plamigo map app initialized');
            //console.log(map);
        }
    }

})(window.geofire.GeoFire);