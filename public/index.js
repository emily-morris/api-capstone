$('.search-page').hide();

$('.sidebar').hide();

$('.btn').click(event => {
    $('.header').hide();
    $('.search-page').show();
});

$('.js-search-form').submit(event => {
	event.preventDefault();
    $.get("/api-capstone?address="+$('.js-query').val(), function(data) {
        console.log(data.coordinates);
    });
    initMap();
    $('.sidebar').show();
	$('.js-query').val('');
});

let businessArr = yelpData.businesses;

function initMap() {
    let userInput = $('.js-query').val();
    let geocoder;
    const map = createMap();
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
}

function compileResults() {
    businessArr.forEach(function(item) {
        let businessName = item.name;
        let businessLocation1 = item.location.display_address[0];
        let businessLocation2 = item.location.display_address[1];
        let businessRating = item.rating;
        let resultString = `<li>${businessName} ${businessLocation1} ${businessLocation2} ${businessRating}</li>`;
        $('.sidebar').append(resultString);
    });
    console.log(item.coordinates);
}




//update markers
//change based on yelp data
// function updateMarker(lat, lng, map) {
//     marker = new google.maps.Marker(
//         {
//             position: {lat, lng},
//             map
//         }
//     );
// }

// function createMap() {
//     return new google.maps.Map(
//         document.getElementById('map'), {
//             zoom: 11,
//             center: {
//                 lat: 32.968288,
//                 lng: -96.867130 
//             }
//         }
//     )   
// };

//user inputs address
//yelp returns array of 10 results based on address
//need markers to show up on map at yelp results