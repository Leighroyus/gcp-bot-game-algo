const express = require('express');
const app = express();

app.use(express.json());

app.post('/', function (req, res) {
  console.log("First req log type:", JSON.stringify(req.body))
  console.log("Second req log type:", req.body)
  
  const moves = ['F', 'T', 'L', 'R'];

  var moves_to_send = moves[Math.floor(Math.random() * moves.length)]

  console.log("What do these moves look like: " + moves_to_send)

  res.send(moves[Math.floor(Math.random() * moves.length)]);
});

app.listen(process.env.PORT || 8080);
