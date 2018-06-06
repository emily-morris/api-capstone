$('.js-search-form').submit(event => {
	event.preventDefault();
    initMap();
	$('.js-query').val('');
});

let businessArr = yelpData.businesses;

function initMap() {}

$(() => {
    initMap = function() {
        let userInput = $('.js-query').val();
        let geocoder;
        let map;
        function initialize() {
            geocoder = new google.maps.Geocoder();
        }
        function codeAddress() {
            let address = $('#address').val();
            geocoder.geocode(
                {
                    'address': address
                },
                function(results, status) {
                    if(status === 'OK') {
                        map.setCenter(results[0].geometry.location);
                        let marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location
                        });
                    } else {
                        alert('Please enter a valid address');
                }
            });
        }
        initialize();
        codeAddress();
        let home = {
            lat: 32.968288,
            lng: -96.867130
        };
        map = new google.maps.Map(
            document.getElementById('map'), {
                zoom: 11,
                center: home
            }
        );
        businessArr.forEach(function(item) {
            let businessLat = item.coordinates.latitude;
            let businessLong = item.coordinates.longitude;
            marker = new google.maps.Marker(
                {
                    position: {lat: businessLat, lng: businessLong},
                    map: map
                }
            );
        });
    }
})