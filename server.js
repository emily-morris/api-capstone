// init project
const express = require('express');
const app = express();
const yelp = require('yelp-fusion');
const apiKey = 'NBivNTuADzZxyu1I7Unf0QUQmPx4O5kFGp-ts88mrAotHHmEuzn46TgXVNzwvVjPeC_4Wm4Tn7qSluT-k4-nJV0WzLFTaDc1W7bPLgJl0euIseVGP0mG0lxCllQRW3Yx';
var morgan = require('morgan')

app.use(morgan('combined'))
function searchYelp(address, res) {
  const searchRequest = {
    location: address,
    limit: 10,
    categories: 'childcare'
  };
  const client = yelp.client(apiKey);
  
  let yelpResponse;
  client.search(searchRequest).then(response => {
    yelpResponse = response.jsonBody.businesses;
    res.send(yelpResponse);
    const prettyJson = JSON.stringify(yelpResponse, null, 4);
    return yelpResponse;
  }).catch(e => {
    console.log(e);
  });
}

app.use(express.static('public'));

//enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  let response = searchYelp(req.query.address, res);
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/close-to-home', (req, res) => {
  let response = searchYelp(req.query.address, res);
});

// listen for requests
let listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
