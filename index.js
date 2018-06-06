$('.js-search-form').submit(event => {
	event.preventDefault();
    let userInput = $('.js-query').val();
    initMap();
	console.log(userInput);
	$('.js-query').val('');
});

let businessArr = yelpData.businesses;
console.log(yelpData.businesses[0]);

function initMap() {}

businessArr.forEach(function(item) {
        let businessLat = item.coordinates.latitude;
        let businessLong = item.coordinates.longitude;
        console.log(businessLat, businessLong)
    });

$(() => {
    initMap = function() {
        let home = {
            lat: 32.968288,
            lng: -96.867130
        };
        let map = new google.maps.Map(
            document.getElementById('map'), {
                zoom: 10,
                center: home
            }
        );
        let marker = new google.maps.Marker(
            {
                position: {lat: 32.983642578125, lng: -96.8434143066406},
                map: map
            }
        );
        marker = new google.maps.Marker(
            {
                position: {lat: 32.968288, lng: -96.867130},
                map: map
            }
        );
        marker = new google.maps.Marker(
            {
                position: {lat: 32.985282, lng: -96.8649369},
                map: map
            }
        );
        marker = new google.maps.Marker(
            {
                position: {lat: 32.958173, lng: -96.819698},
                map: map
            }
        );
        marker = new google.maps.Marker(
            {
                position: {lat: 32.92904, lng: -96.8182},
                map: map
            }
        );
        marker = new google.maps.Marker(
            {
                position: {lat: 33.000633, lng: -96.888403},
                map: map
            }
        );
        marker = new google.maps.Marker(
            {
                position: {lat: 32.90145, lng: -96.83574},
                map: map
            }
        );
        marker = new google.maps.Marker(
            {
                position: {lat: 33.032779, lng: -96.835548},
                map: map
            }
        );
        marker = new google.maps.Marker(
            {
                position: {lat: 32.98921, lng: -96.88148},
                map: map
            }
        );
        marker = new google.maps.Marker(
            {
                position: {lat: 33.028761, lng: -96.791527},
                map: map
            }
        );
        marker = new google.maps.Marker(
            {
                position: {lat: 33.053398, lng: -96.771141},
                map: map
            }
        ); 
    }
})