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

// curl 'https://webflow.com/api/v1/form/5f3ce7d38b0a42cbcba07bf6' \
//   --data-raw 'name=Email+Form&source=https%3A%2F%2Fforager.ai%2F&test=false&fields%5BName+2%5D=Gutorov+Vladimir&fields%5BEmail+2%5D=vlgutv%40gmail.com&fields%5BField+3%5D=test&fields%5BField+4%5D=test.com&dolphin=false' \
//   --compressed
