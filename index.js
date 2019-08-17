const curl = new (require('curl-request'))();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.options('*', cors());

app.get('/', function(req, res) {
  if (req.query.url && req.query.body) {
    const body = JSON.parse(req.query.body);

    curl
      .setBody(body)
      .post(url)
      .then(({ statusCode, body, headers }) => {
        res.send({ statusCode, body, headers });
      })
      .catch(e => {
        res.status(400);
        res.send(e);
      });
  } else {
    res.status(400);
    res.send('Invalid request');
  }
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
