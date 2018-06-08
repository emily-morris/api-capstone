$('.search-page').hide();

$('.sidebar').hide();

$('.btn').click(event => {
    $('.header').hide();
    $('.search-page').show();
});

$('.js-search-form').submit(event => {
	event.preventDefault();
    initMap();
    $('.sidebar').show();
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
        compileResults();
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

function compileResults() {
    businessArr.forEach(function(item) {
        let businessName = item.name;
        let businessLocation1 = item.location.display_address[0];
        let businessLocation2 = item.location.display_address[1];
        let businessRating = item.rating;
        let resultString = `<li>${businessName} ${businessLocation1} ${businessLocation2} ${businessRating}</li>`;
        $('.sidebar').append(resultString);
    });
}