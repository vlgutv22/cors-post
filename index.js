const express = require('express');
const app = express();
const cors = require('cors');
var curl = require('curlrequest');
const port = process.env.PORT || 8080;

app.use(cors());
app.options('*', cors());
app.get('/', function (req, res) {
  if (req.query.url && req.query.body) {
    const url = req.query.url;
    const body = JSON.parse(req.query.body);

    curl.request({ url, data: body }, function (err, data) {
      if (err === null) {
        res.send(data);
        res.status(200);
      } else {
        res.status(400);
        res.send(err);
      }
    });
  } else {
    res.status(400);
    res.send('Invalid request');
  }
});

app.listen(port, function () {
  console.log('Example app listening on port: ' + port);
});
