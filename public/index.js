$('.search-page').hide();

$('.sidebar').hide();

$('.btn').click(event => {
    $('.header').hide();
    $('.search-page').show();
});

$('.js-search-form').submit(event => {
	event.preventDefault();
    var defaultPath = '';
    // var localPath = 'https://polar-tundra-83165.herokuapp.com';
    var localPath = 'http://localhost:3000';
    $.get(localPath + "/api-capstone?address="+$('.js-query').val(), function(data) {
        initMap(data);
    });
    $('.sidebar').show();
});

 function createGeocoder() {
    return new google.maps.Geocoder();
}

function codeAddress(geocoder, map) {
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

function initMap(yelpResults) {
    let userInput = $('.js-query').val();
    let geocoder = createGeocoder();
    const map = createMap();
    codeAddress(geocoder, map);
    compileResults(yelpResults, map);
}

function compileResults(yelpResults, map) {
    $('.results').empty();
    yelpResults.forEach(function(item) {
        let businessName = item.name;
        let businessLoc1 = item.location.display_address[0];
        let businessLoc2 = item.location.display_address[1];
        let businessRating = item.rating;
        let resultString = `<li>${businessName} ${businessLoc1} ${businessLoc2} ${businessRating}</li>`;
        $('.results').append(resultString);
        updateMarker(item.coordinates.latitude, item.coordinates.longitude, map);
        $('.js-query').val('');
    });
}

function updateMarker(lat, lng, map) {
    return new google.maps.Marker(
        {
            position: {lat, lng},
            map
        }
    );
}

function createMap(lat, lng) {
    return new google.maps.Map(
        document.getElementById('map'), {
            zoom: 11,
            center: {
                lat: 32.968288,
                lng: -96.867130 
            }
        }
    )   
}