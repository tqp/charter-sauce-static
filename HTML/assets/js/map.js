google.maps.event.addDomListener(window, 'load', init);
        // Marker customization
        function CustomMarker(latlng, map, args) {

            this.latlng = latlng;
            this.args = args;
            this.setMap(map);

        }

        CustomMarker.prototype = new google.maps.OverlayView();

        CustomMarker.prototype.draw = function() {

            var self = this;

            var div = this.div;

            if (!div) {

                div = this.div = document.createElement('div');

                div.className = 'b-contacts_map_marker';

                div.style.position = 'absolute';
                div.style.cursor = 'pointer';

                if (typeof(self.args.marker_id) !== 'undefined' && typeof(div.dataset) !== 'undefined') {
                    div.dataset.marker_id = self.args.marker_id;
                }

                /*google.maps.event.addDomListener(div, "click", function(event) {
                    //google.maps.event.trigger(self, "click");
                });*/

                var panes = this.getPanes();
                panes.overlayImage.appendChild(div);
            }

            var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

            if (point) {
                div.style.left = (point.x - 17) + 'px';
                div.style.top = (point.y - 17) + 'px';
            }
        };

        CustomMarker.prototype.remove = function() {
            if (this.div) {
                this.div.parentNode.removeChild(this.div);
                this.div = null;
            }
        };

        CustomMarker.prototype.getPosition = function() {
            return this.latlng;
        };

        function init() {
            // Basic options for a simple Google Map
            // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
            var mapOptions = {
                // How zoomed in you want the map to start at (always required)
                zoom: 5,

                // The latitude and longitude to center the map (always required)
                center: new google.maps.LatLng(-76.43960423501825, 24.170393147115067), //
                disableDefaultUI: true,
                // How you would like to style the map.
                // This is where you would paste any style found on Snazzy Maps.
                styles: [{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#46bcec" }, { "visibility": "on" }] }]

            };

            // Get the HTML DOM element that will contain your map
            // We are using a div with id="map" seen below in the <body>

            $(".y-map").each(function(){
                var this_id   = $(this).attr("id");

                var lattitude = $(this).attr("data-latt");
                var longitude = $(this).attr("data-long");
                var mapElement = document.getElementById(this_id);
                mapOptions.center = new google.maps.LatLng(lattitude, longitude);

                var map = new google.maps.Map(mapElement, mapOptions);
                overlay = new CustomMarker(new google.maps.LatLng(lattitude, longitude), map, { marker_id: 'b_contacts_map_marker' });
            })

            // Create the Google Map using our element and options defined above

            // Let's also add a marker while we're at it
            // var marker = new google.maps.Marker({
            //     position: new google.maps.LatLng(52.229676, 21.012229),
            //     map: map,
            //     icon: 'http://118.102.206.67/trada/assets/images/google_map_marker.png'
            // });
        }
