const YELP_SEARCH_URL = "https://api.yelp.com/v3/businesses/search";

function getDataFromApi(searchTerm, callback) {
	const params = {
		location: searchTerm
	}
	$.ajax({
		url: YELP_SEARCH_URL,
		data: params,
		beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer insert API key here')}
	}).done(callback);
}

getDataFromApi('2009 Via Bravo Carrollton, TX', function(response) {
	console.log(response);
})


$('.js-search-form').submit(event => {
	event.preventDefault();
	initialize();
	let userInput = $('.js-query').val();
	console.log(userInput);
	codeAddress();
	$('.js-query').val('');
	// initMap(userInput);
});

let geocoder;
let map;
function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng();
    var mapOptions = {
      zoom: 10,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function codeAddress() {
    let address = $('#address').val();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status === 'OK') {
        map.setCenter(results[0].geometry.location);
        console.log(results);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert('Please enter a valid address');
      }
    });
  }