const express = require('express');
const app = express();

app.use(express.json());

app.post('/', function (req, res) {

  //testing output code
  //console.log("First req log type:", JSON.stringify(req.body))
  //console.log("Second req log type:", req.body)
  //console.log(req.body.arena['dims'])

  //get players
  var player_urls = [];
  var player_data = [];

  Object.entries(req.body.arena.state).forEach(([key, val]) => {

    player_urls.push(key);
    player_data.push(val);

  });

  console.log("Player URLS:");
  for (var i = 0; i < player_urls.length; i++) {
    console.log("Index: " + i + ": " + player_urls[i]);
  }

  const moves = ['F', 'T', 'L', 'R'];

  var moves_to_send = moves[Math.floor(Math.random() * moves.length)]

  //console.log("What do these moves look like: " + moves_to_send)

  res.send(moves[Math.floor(Math.random() * moves.length)]);
});

app.listen(process.env.PORT || 8080);


// { "_links": { "self": { "href": "https://gcpbotgame-jl6m2wkduq-uc.a.run.app" } }, "arena": { "dims": [6, 4], "state": { "https://cloud-game-random-bot-z3eu2gxmuq-uc.a.run.app": { "x": 4, "y": 3, "direction": "W", "wasHit": true, "score": -329 }, "https://cloudbowl-samples-nodejs-jl6m2wkduq-uc.a.run.app": { "x": 5, "y": 3, "direction": "S", "wasHit": false, "score": -77 }, "https://gcpbotgame-jl6m2wkduq-uc.a.run.app": { "x": 4, "y": 2, "direction": "W", "wasHit": false, "score": -122 }, "https://cloudbowl-samples-nodejs-45hqnxtrtq-uc.a.run.app": { "x": 2, "y": 3, "direction": "E", "wasHit": false, "score": 528 } } } }