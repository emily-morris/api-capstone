// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const yelp = require('yelp-fusion');
const apiKey = 'NBivNTuADzZxyu1I7Unf0QUQmPx4O5kFGp-ts88mrAotHHmEuzn46TgXVNzwvVjPeC_4Wm4Tn7qSluT-k4-nJV0WzLFTaDc1W7bPLgJl0euIseVGP0mG0lxCllQRW3Yx';

function searchYelp(address, res) {
  const searchRequest = {
    location: address,
    limit: 10,
    categories: 'childcare'
  };
  console.log(searchRequest);
  const client = yelp.client(apiKey);
  var yelpResponse;
  client.search(searchRequest).then(response => {
    yelpResponse = response.jsonBody.businesses;
    console.log(yelpResponse);
    res.send(yelpResponse);
    const prettyJson = JSON.stringify(yelpResponse, null, 4);
    return yelpResponse;
  }).catch(e => {
    console.log(e);
  });
}
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get('/api-capstone', (req, res) => {
  var response = searchYelp(req.query.address, res);
   console.log(res);
   res.sendFile(__dirname + '/views/index.html');
  // res.send(searchYelp(req.query.address));
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});