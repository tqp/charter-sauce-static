let globalMap = null;

function initMap() {
    const centerlat = 24.57347223834123;
    const centerlng = -76.89728186648836;
    const zoom = 9;
    const center = {lat: centerlat, lng: centerlng};
    const map = initializeMap(center, zoom)
    globalMap = map;
    map.setOptions({styles: getStyle()});

    google.maps.event.addListener(map, 'click', function (event) {
        console.log('{lat: ' + event.latLng.lat() + ', lng: ' + event.latLng.lng() + '},');
    });

    const airport = "http://maps.google.com/mapfiles/kml/pal2/icon56.png";
    const starCircle = "http://maps.google.com/mapfiles/kml/pal4/icon58.png";
    const star = "http://maps.google.com/mapfiles/kml/pal4/icon59.png"
    const square = "http://maps.google.com/mapfiles/kml/pal4/icon24.png";
    const squareShadow = "http://maps.google.com/mapfiles/kml/pal4/icon27.png";
    addMarker({lat: 24.172585875448874, lng: -76.44586961909374}, 'staniel_cay_yacht_club', map, starCircle);
    const staniel_cay_airport = addMarker({
        lat: 24.169426698959466,
        lng: -76.43908756583203
    }, 'staniel_cay_airport', map, airport);
    addMarker({lat: 24.10108834621558, lng: -76.40180633162996}, 'black_point', map, star);
    addMarker({lat: 24.178741780237917, lng: -76.44703736931876}, 'thunderball_grotto', map, square);
    addMarker({lat: 24.18359784753267, lng: -76.45657581206754}, 'pig_beach', map, square);
    addMarker({lat: 24.26142968261424, lng: -76.51279127510846}, 'compass_cay', map, square);
    addMarker({lat: 24.394485774503366, lng: -76.6351405667841}, 'shroud_cays', map, star);
    addMarker({lat: 24.596145619822394, lng: -76.82159504035788}, 'macduffs', map, star);
    addMarker({lat: 25.020868101894074, lng: -77.27408835569118}, 'palm_cay_marina', map, star);
    addMarker({lat: 25.048874439547383, lng: -77.46704318041039}, 'nassau_airport', map, airport);
    // http://kml4earth.appspot.com/icons.html#shapes

    assessMarkerVisibility(map);
    google.maps.event.addListener(map, 'zoom_changed', function () {
        console.log('zoom', map.getZoom());
        assessMarkerVisibility(map);
    });

    const stanielCayToBlackPoint = [
        {lat: 24.172585875448874, lng: -76.44586961909374},
        {lat: 24.170175544741998, lng: -76.45126107138182},
        {lat: 24.106000087822558, lng: -76.4145692542513},
        {lat: 24.101044204691068, lng: -76.40178640824367},
    ];
    addTrack(stanielCayToBlackPoint, map, '#ffff00');

    const stanielCayToThunderballGrotto = [
        {lat: 24.172585875448874, lng: -76.44586961909374},
        {lat: 24.176401758289735, lng: -76.44493410116877},
        {lat: 24.178916275910638, lng: -76.44694149193896},
        {lat: 24.17886733787672, lng: -76.44710778889788},
    ];
    addTrack(stanielCayToThunderballGrotto, map, '#ffff00');

    const stanielCayToPigBeach = [
        {lat: 24.172585875448874, lng: -76.44586961909374},
        {lat: 24.175278046125182, lng: -76.45618659528284},
        {lat: 24.178488431676254, lng: -76.46288138898402},
        {lat: 24.183029814767277, lng: -76.46159392865687},
        {lat: 24.18357389573023, lng: -76.4565776933086},
    ];
    addTrack(stanielCayToPigBeach, map, '#ffff00');

    const stanielCayToCompassCay = [
        {lat: 24.172585875448874, lng: -76.44586961909374},
        {lat: 24.18101238800494, lng: -76.49090352523443},
        {lat: 24.20609420724649, lng: -76.51653702258035},
        {lat: 24.244855846322594, lng: -76.5316868384302},
        {lat: 24.25813447384968, lng: -76.52467951517038},
        {lat: 24.259543004896, lng: -76.5156243775361},
        {lat: 24.260873269888954, lng: -76.51330694894723},
    ];
    addTrack(stanielCayToCompassCay, map, '#ffff00');

    const compassCayToShroudCays = [
        {lat: 24.260873269888954, lng: -76.51330694894723},
        {lat: 24.254557734562077, lng: -76.59778786629165},
        {lat: 24.3356459405208, lng: -76.64282858510815},
        {lat: 24.389972837537016, lng: -76.63482772892772},
        {lat: 24.39396491579928, lng: -76.63523562318302},
    ];
    addTrack(compassCayToShroudCays, map, '#ffff00');

    const shroudCaysToNormansCay = [
        {lat: 24.39396491579928, lng: -76.63523562318302},
        {lat: 24.39002774944493, lng: -76.63530655490837},
        {lat: 24.35392188385342, lng: -76.65593727529748},
        {lat: 24.370497734418286, lng: -76.76545723379357},
        {lat: 24.496778039649097, lng: -76.80940254629357},
        {lat: 24.586646972617316, lng: -76.8296491903286},
        {lat: 24.59609004027939, lng: -76.82162067128857},
    ];
    addTrack(shroudCaysToNormansCay, map, '#ffff00');

    const track7 = [
        {lat: 24.59609004027939, lng: -76.82162067128857},
        {lat: 25.018781242915026, lng: -77.27258380304919},
        {lat: 25.0205312157965, lng: -77.27367814432726},
    ];
    addTrack(track7, map, '#ffff00');

    addArrow();

    // FUNCTIONS

    function initializeMap(center, zoom) {
        return new google.maps.Map(document.getElementById("map"), {
            zoom: zoom,
            center: center,
            disableDefaultUI: true,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            mapTypeId: 'satellite'
        });
    }

    function addMarker(position, id, map, icon) {
        return new google.maps.Marker({
            position: position,
            map: map,
            icon: icon,
        });
    }

    function addTrack(path, map, color) {
        const track = new google.maps.Polyline({
            path: path,
            geodesic: true,
            strokeColor: color,
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });
        track.setMap(map);
    }

    function addArrow() {
        const lineSymbol = {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        };
        const line = new google.maps.Polyline({
            path: [
                {lat: 38.88616180804906, lng: -77.09481956450536},
                {lat: 38.88617091517384, lng: -77.0881506337004},
            ],
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
            icons: [
                {
                    icon: lineSymbol,
                    offset: "100%",
                },
            ],
            map: map,
        });
    }

    function assessMarkerVisibility(map) {
        console.log('assessMarkerVisibility');
        if (map.getZoom() >= 10) {
            console.log('show');
            staniel_cay_airport.visible = true;
        } else {
            console.log('hide');
            staniel_cay_airport.visible = false;
        }
    }

    function getStyle() {
        return [
            {
                "featureType": "water",
                "stylers": [
                    {
                        "color": "#97CEF4"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "stylers": [
                    {
                        "color": "#81BB87"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            }
        ]
    }
}

function panToLocation(lat, lng, zoom) {
    const map = globalMap;
    // window.setTimeout(() => {
    //     map.panTo({lat: 24.172559707261716, lng: -76.44512579959382});
    //     map.setZoom(11)
    // }, 500);
    window.setTimeout(() => {
        map.panTo({lat: lat, lng: lng});
        map.setZoom(zoom);
    }, 500);
}

function getLatLngZoom() {
    const map = globalMap;
    const center = map.getCenter();
    console.log('lat', center.lat(), 'lng', center.lng(), 'zoom', map.getZoom());
}

