const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/', function (req, res) {
  console.log(req.body);
  
  const moves = ['F', 'T', 'L', 'R'];

  var moves_to_send = moves[Math.floor(Math.random() * moves.length)]

  console.log("What do these moves look like: " + moves_to_send)

  res.send(moves_to_send);
});

app.listen(process.env.PORT || 8080);
