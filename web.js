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

  //temp my player x and y
  var my_player_x;
  var my_player_prev_x;
  var my_player_y;
  var my_player_direction;


  fs = require('fs')

  console.log('Trying to read from file...')
  try {
    const data = fs.readFile('/workspace/data.txt', 'utf8')
    console.log('My player previous x pos: ' + data)
    my_player_prev_x = data;
  } catch (err) {
    console.error(err)
  }

  Object.entries(req.body.arena.state).forEach(([key, val]) => {

    player_urls.push(key);
    player_data.push(val);

  });

  for (var i = 0; i < player_data.length; i++) {
    
    console.log("Player name: " + i + ": " + player_urls[i]);

    Object.entries(player_data[i]).forEach(([key, val]) => {
        console.log("Player data " + key + ": " + val) 

        if (i == 2) 
        {
          if (key == 'x') {
            my_player_x = val;
          }
          if (key == 'y') {
            my_player_y = val;
          }
          if (key == 'direction') {
            my_player_direction = val; 
          }
        }

    });

  }

  console.log('My player x: ' + my_player_x)
  console.log('My player y: ' + my_player_y)
  console.log('My player direction: ' + my_player_direction)

  //movement test
  //always move right

  const moves = ['F', 'T', 'L', 'R'];

  //var moves_to_send = moves[Math.floor(Math.random() * moves.length)]

  //console.log("What do these moves look like: " + moves_to_send)

  //res.send(moves[Math.floor(Math.random() * moves.length)]);

  if (my_player_prev_x == my_player_x)
  {
    console.log('X coords have not moved!')
    if (my_player_x != 0 & my_player_x != 5)
    {
      res.send('T');
      console.log('I am stuck by another player so time to throw!')
    }
  }

  if (my_player_direction == 'N')
  {
    if (my_player_x < 5)
    {
      res.send('R');
    }
    if (my_player_x == 5)
    {
      res.send('L');
    }
  }

  if (my_player_direction == 'S')
  {
    if (my_player_x < 5)
    {
      res.send('L');
    }
    if (my_player_x == 5)
    {
      res.send('R');
    }
  }

  if (my_player_direction == 'E')
  {
    if (my_player_x < 5)
    {
      res.send('F');
    }
    if (my_player_x == 5)
    {
      res.send('L');
    }
  }

  if (my_player_direction == 'W')
  {
    if (my_player_x > 0)
    {
      res.send('F');
    }
    if (my_player_x == 0)
    {
      res.send('R');
    }
  }

  fs.writeFile('/workspace/data.txt', my_player_x, function (err) {
      if (err) 
          return console.log(err);
      console.log('my_player_x written to file.');
  });

});

app.listen(process.env.PORT || 8080);


// { "_links": { "self": { "href": "https://gcpbotgame-jl6m2wkduq-uc.a.run.app" } }, "arena": { "dims": [6, 4], "state": { "https://cloud-game-random-bot-z3eu2gxmuq-uc.a.run.app": { "x": 4, "y": 3, "direction": "W", "wasHit": true, "score": -329 }, "https://cloudbowl-samples-nodejs-jl6m2wkduq-uc.a.run.app": { "x": 5, "y": 3, "direction": "S", "wasHit": false, "score": -77 }, "https://gcpbotgame-jl6m2wkduq-uc.a.run.app": { "x": 4, "y": 2, "direction": "W", "wasHit": false, "score": -122 }, "https://cloudbowl-samples-nodejs-45hqnxtrtq-uc.a.run.app": { "x": 2, "y": 3, "direction": "E", "wasHit": false, "score": 528 } } } }