$('.search-page').hide();
$('.results-page').hide();
$('.sidebar').hide();
$('#map').hide();

$('.btn').click(event => {
    $('.landing-page').hide();
    $('.search-page').show();
});

$('.js-search-form').submit(event => {
	event.preventDefault();
    var defaultPath = '';
    // var localPath = 'https://polar-tundra-83165.herokuapp.com';
    // var localPath = 'http://localhost:3000';
    $.get("/api-capstone?address="+$('.js-query').val(), function(data) {
        initMap(data);
    });
    $('.search-page').hide();
    $('.results-page').show();
    $('.sidebar').show();
    $('#map').show();
});

function newSearch() {
    $('.new-search').click(event => {
        $('.search-page').show();
        $('.results-page').hide();
        $('.sidebar').hide();
        $('#map').hide();
    });
}

newSearch();

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
        let resultString = `<li>${businessName}<br/> <em>Address:</em> ${businessLoc1} ${businessLoc2}<br/> <em>Rating:</em> ${businessRating}</li>`;
        $('.results').append(resultString);
        updateMarker(item.coordinates.latitude, item.coordinates.longitude, map);
        const infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.setContent(resultString);
            infoWindow.open(map, marker);
        })
        $('.js-query').val('');
    });
}

function updateMarker(lat, lng, map) {
   marker = new google.maps.Marker(
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