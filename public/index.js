let homeLoc;
let directionsService;
let directionsDisplay;
let yelpData;

//load homepage
$('.results-page').hide();
$('.sidebar').hide();
$('#map').hide();

//user submits search
$('.js-search-form').submit(event => {
    event.preventDefault();
    var defaultPath = '';
    // var localPath = 'https://polar-tundra-83165.herokuapp.com';
    var localPath = 'http://localhost:3000';
    var params = { address:  $('.js-query').val()};
    console.log(params);
    $.getJSON(localPath + '/api-capstone', params, function(data) {
        yelpData = data;
        initMap(data);
    });
   $('.landing-page').hide();
   $('.results-page').show();
   $('#map').show();
   $('.sidebar').show();
});

//view list of search results
$('.results-btn').click(event => {
    $('.sidebar').show();
    $('.show-results').empty();
    $('.results').show();
});

//back to homepage for new search
$('.new-search-btn').click(event => {
  $('.landing-page').show();
  $('.results-page').hide();
  $('.sidebar').hide();
  $('#map').hide();
  location.reload();
});

//convert user input to latitude/longitude
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

//set up map with coordinates of search results and user input
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
function initMap(yelpResults) {
  let userInput = $('.js-query').val();
  let geocoder = createGeocoder();
  const map = createMap();
  codeAddress(geocoder, map, yelpResults);   
}

//set markers on map
function updateMarker(lat, lng, map) {
  marker = new google.maps.Marker(
      {
          position: {lat, lng},
          map
      }
  );
}

//get directions from user address to child care site
function getDir(resultLat, resultLng) {
  let destination = new google.maps.LatLng(resultLat, resultLng);
  let request = {
      origin: homeLoc,
      destination: destination,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  directionsService.route(request, function (response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
          $('.show-results').empty();
          $(".results").hide();
          directionsDisplay.setDirections(response);
      } 
  });
}

//set up list of results
function compileResults(yelpResults, map, homeLoc) {
  yelpResults.forEach(function(item) {
      populateSidebar(item);
      updateMarker(item.coordinates.latitude, item.coordinates.longitude, map);

      let markers = [];

      //create info windows when clicking on markers
      function getInfo() {
          let numMarkers = yelpResults.length;
          for(let i = 0; i < numMarkers; i++) {
              markers[i] = new google.maps.Marker({
                  position: {lat:yelpResults[i].coordinates.latitude, lng:yelpResults[i].coordinates.longitude},
                  map: map,
                  html: yelpResults[i].name + '<br/>' + yelpResults[i].location.address1,
                  id: i
              });

              google.maps.event.addListener(markers[i], 'click', function() {
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
              directionsDisplay.setPanel(document.getElementById('show-results'));
          }
      }
      getInfo();
      $('.js-query').val('');
  });
}

//show search results on sidebar
function populateSidebar(item) {
    console.log(item.url);
    let businessName = item.name;
    let businessLoc1 = item.location.display_address[0];
    let businessLoc2 = item.location.display_address[1];
    let businessRating = item.rating;
    let businessUrl = item.url;
    let resultString = `<li><strong>${businessName}</strong><br/> <em>Address:</em> ${businessLoc1} ${businessLoc2}<br/> <em>Rating:</em> ${businessRating}<br/> <a href=${businessUrl}>See reviews</a></li>`;
    $('.results').append(resultString);
}