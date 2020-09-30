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
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    request(options, function (error, response) {
      console.log(error, response.body);
      return;
    });
  } else {
    res.status(400);
    res.send('Invalid request');
  }
});

app.listen(port, function () {
  console.log('Example app listening on port: ' + port);
});
