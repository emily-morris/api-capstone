function loadPage() {
    $('.search-page').hide();
    $('.results-page').hide();
    $('.sidebar').hide();
    $('#map').hide();
}

loadPage();

function getSearch() {
    $('.btn').click(event => {
        $('.landing-page').hide();
        $('.search-page').show();
    });
}

getSearch();

let homeLoc;
let directionsService;
let directionsDisplay;

function doSearch() {
    $('.js-search-form').submit(event => {
    	event.preventDefault();
        var defaultPath = '';
        // var localPath = 'https://polar-tundra-83165.herokuapp.com';
        var localPath = 'http://localhost:3000';
        $.get(localPath + "/api-capstone?address=" + $('.js-query').val(), function(data) {
            initMap(data);
        });
        $('.search-page').hide();
        $('.results-page').show();
        $('.sidebar').show();
        $('#map').show();
    });
}

doSearch();

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

function codeAddress(geocoder, map, yelpResults) {
    let address = $('#address').val();
    geocoder.geocode(
        {
            'address': address
        },
        function(results, status) {
            if(status === 'OK') {
                homeLoc = results[0].geometry.location;
                console.log(results[0].geometry.location);
                map.setCenter(results[0].geometry.location);
                let marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            } else {
                alert('Please enter a valid address');
            }
            compileResults(yelpResults, map, results[0].geometry.location);
        }
    );
}


function initMap(yelpResults) {
    let userInput = $('.js-query').val();
    let geocoder = createGeocoder();
    const map = createMap();
    codeAddress(geocoder, map, yelpResults);   
}

function compileResults(yelpResults, map, homeLoc) {
    $('.results').empty();
    yelpResults.forEach(function(item) {
        let businessName = item.name;
        let businessLoc1 = item.location.display_address[0];
        let businessLoc2 = item.location.display_address[1];
        let businessRating = item.rating;
        let resultString = `<li><strong>${businessName}</strong><br/> <em>Address:</em> ${businessLoc1} ${businessLoc2}<br/> <em>Rating:</em> ${businessRating}</li>`;
        
        $('.results').append(resultString);
        
        updateMarker(item.coordinates.latitude, item.coordinates.longitude, map);
        
        let markers = [];
     
        function getInfo() {

            let numMarkers = yelpResults.length;
            console.log(yelpResults);
            for(let i = 0; i < numMarkers; i++) {
                console.log(yelpResults[i].location);
                markers[i] = new google.maps.Marker({
                    position: {lat:yelpResults[i].coordinates.latitude, lng:yelpResults[i].coordinates.longitude},
                    map: map,
                    html: yelpResults[i].name + '<br/>' + yelpResults[i].location.address1,
                    id: i
                });
                
                google.maps.event.addListener(markers[i], 'click', function() {
                    console.log(this);
                    let infoWindow = new google.maps.InfoWindow({
                        id: this.id,
                        content: this.html + '<br/>' + '<input type="button" onClick="getDir(' + yelpResults[i].coordinates.latitude + ',' + yelpResults[i].coordinates.longitude + ')" value="Get directions">',
                        position: this.getPosition()
                    });
                    google.maps.event.addListenerOnce(infoWindow, 'closeclick', function() {
                        markers[this.id].setVisible(true);
                    });
                    this.setVisible(false);
                    infoWindow.open(map);
                });
                geocoder = new google.maps.Geocoder();
                directionsService = new google.maps.DirectionsService();
                directionsDisplay = new google.maps.DirectionsRenderer({
                    suppressMarkers: false
                });
                directionsDisplay.setMap(map);
                directionsDisplay.setPanel(document.getElementById("show-results"));
            }
        }
        getInfo();

        $('.js-query').val('');
    });
}

function getDir(resultLat, resultLng) {
    console.log(homeLoc);
    let destination = new google.maps.LatLng(resultLat, resultLng);
    let request = {
        origin: homeLoc,
        destination: destination,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            $('.show-results').empty();
            directionsDisplay.setDirections(response);
        } 
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