const express = require('express');
const app = express();
const cors = require('cors');
const request = require('request');
const port = process.env.PORT || 8080;

app.use(cors());
app.options('*', cors());
app.get('/', function (req, res) {
  if (req.query.url && req.query.body) {
    const url = req.query.url;
    const body = JSON.parse(req.query.body);
    const options = {
      method: 'POST',
      url: url,
      body: body,
      json: true, // JSON stringifies the body automatically
    };

    request(options)
      .then(function (response) {
        console.log(response);
        // Handle success response data
      })
      .catch(function (err) {
        console.log(response);
        // Handle err response
      });
  } else {
    res.status(400);
    res.send('Invalid request');
  }
});

app.listen(port, function () {
  console.log('Example app listening on port: ' + port);
});
