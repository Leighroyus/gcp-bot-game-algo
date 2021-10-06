function isEven(value){
  if (value%2 == 0)
      return true;
  else
      return false;
};

my_player_prev_x = 999;
my_player_stuck_counter = 1;

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

  //set my player name
  var my_player_name;

  my_player_name = 'https://gcpbotgame-jl6m2wkduq-uc.a.run.app'

  //temp my player x and y
  var my_player_x;
  //var my_player_prev_x;
  var my_player_y;
  var my_player_direction;
  var my_player_make_a_throw;

  var hi_score_player_name;
  var hi_score_player_score;
  var hi_score_player_x;
  var hi_score_player_y;
  var hi_score_player_direction;
  
  var temp_x;
  var temp_y;
  var temp_direction;
  var temp_current_score;
  var temp_previous_score;
  temp_previous_score = 0;

  const current_time = new Date();

  //console.log(current_time.getSeconds());

  my_player_make_a_throw = isEven(current_time.getSeconds())
  console.log('Make a throw: ' + isEven(current_time.getSeconds()))

  Object.entries(req.body.arena.state).forEach(([key, val]) => {

    player_urls.push(key);
    player_data.push(val);

  });

  for (var i = 0; i < player_data.length; i++) {
    
    console.log("Player name: " + i + ": " + player_urls[i]);

    Object.entries(player_data[i]).forEach(([key, val]) => {
        console.log("Player data " + key + ": " + val) 

        //temp storage of player data
        if (key == 'x') {
          temp_x = val;
        }
        if (key == 'y') {
          temp_y = val;
        }
        if (key == 'direction') {
          temp_direction = val; 
        }

        //get my player's data
        if (player_urls[i] == my_player_name) 
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

        if (key == 'score') {
          temp_current_score = val; 
        }
        //get player with the highest score
        if (temp_current_score > temp_previous_score)
        {
          hi_score_player_name = player_urls[i]
          hi_score_player_score = temp_current_score
          temp_previous_score = temp_current_score
        }    

    });

    if (player_urls[i] == hi_score_player_name)
    {
      hi_score_player_x = temp_x;
      hi_score_player_y = temp_y;
      hi_score_player_direction = temp_direction;
    }

  }

  console.log('Player with the highest score: ' + hi_score_player_name + ', with a score of: ' + hi_score_player_score)
  console.log('Player with the highest score - X Pos: ' + hi_score_player_x)
  console.log('Player with the highest score - Y Pos: ' + hi_score_player_y)
  console.log('Player with the highest score - Direction: ' + hi_score_player_direction)
  
  console.log('My player x: ' + my_player_x)
  console.log('My player y: ' + my_player_y)
  console.log('My player direction: ' + my_player_direction)

  //movement test
  //always move right

  const moves = ['F', 'T', 'L', 'R'];

  //var moves_to_send = moves[Math.floor(Math.random() * moves.length)]

  //console.log("What do these moves look like: " + moves_to_send)

  //res.send(moves[Math.floor(Math.random() * moves.length)]);
  
  if (my_player_make_a_throw == true)
  {
    res.send('T');
    console.log('Throw made!');
  } else {


  if (my_player_prev_x == my_player_x & my_player_stuck_counter >= 4)
  {
    if (my_player_x != 0 & my_player_x != 8)
    {

      console.log('I am stuck by another player!')
      //bottom of screen?
      if (my_player_y == 5)
      {
          if (my_player_direction == 'E')
          {
            res.send('L');
          }
          else if (my_player_direction == 'W')
          {
            res.send('R');
          }
          else if (my_player_direction == 'N')
          {
            //my_player_stuck_counter =1;
            res.send('F');
          }
      }
      if (my_player_y == 4)
      {
          if (my_player_direction == 'E')
          {
            res.send('L');
          }
          else if (my_player_direction == 'W')
          {
            res.send('R');
          }
          else if (my_player_direction == 'N')
          {
            //my_player_stuck_counter =1;
            res.send('F');
          }
      }
      if (my_player_y == 3)
      {
          if (my_player_direction == 'E')
          {
            res.send('L');
          }
          else if (my_player_direction == 'W')
          {
            res.send('R');
          }
          else if (my_player_direction == 'N')
          {
            //my_player_stuck_counter =1;
            res.send('F');
          }
      }
      if (my_player_y == 2)
      {
        if (my_player_direction == 'E')
        {
          res.send('R');
        }
        else if (my_player_direction == 'W')
        {
          res.send('L');
        }
        else if (my_player_direction == 'S')
        {
          //my_player_stuck_counter =1;
          res.send('F');
        }
      }
      if (my_player_y == 1)
      {
          if (my_player_direction == 'E')
          {
            res.send('R');
          }
          else if (my_player_direction == 'W')
          {
            res.send('L');
            //res.send('T');
          }
          else if (my_player_direction == 'S')
          {
            //my_player_stuck_counter =1;
            res.send('F');
          }
      }
      if (my_player_y == 0)
      {
          if (my_player_direction == 'E')
          {
            res.send('R');
          }
          else if (my_player_direction == 'W')
          {
            res.send('L');
          }
          else if (my_player_direction == 'S')
          {
            //my_player_stuck_counter =1;
            res.send('F');
          }
      }

    }
  }

  if (my_player_direction == 'N')
  {
    if (my_player_x < 8)
    {
      res.send('R');
    }
    if (my_player_x == 8)
    {
      res.send('L');
    }
  }

  if (my_player_direction == 'S')
  {
    if (my_player_x < 8)
    {
      res.send('L');
    }
    if (my_player_x == 8)
    {
      res.send('R');
    }
  }

  if (my_player_direction == 'E')
  {
    if (my_player_x < 8)
    {
      res.send('F');
    }
    if (my_player_x == 8)
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

}

my_player_prev_x = my_player_x;
my_player_stuck_counter = my_player_stuck_counter +1;
if ((my_player_stuck_counter % 5) == 0)
{
  my_player_stuck_counter = 1;
}

});

app.listen(process.env.PORT || 8080);


// { "_links": { "self": { "href": "https://gcpbotgame-jl6m2wkduq-uc.a.run.app" } }, "arena": { "dims": [6, 4], "state": { "https://cloud-game-random-bot-z3eu2gxmuq-uc.a.run.app": { "x": 4, "y": 3, "direction": "W", "wasHit": true, "score": -329 }, "https://cloudbowl-samples-nodejs-jl6m2wkduq-uc.a.run.app": { "x": 5, "y": 3, "direction": "S", "wasHit": false, "score": -77 }, "https://gcpbotgame-jl6m2wkduq-uc.a.run.app": { "x": 4, "y": 2, "direction": "W", "wasHit": false, "score": -122 }, "https://cloudbowl-samples-nodejs-45hqnxtrtq-uc.a.run.app": { "x": 2, "y": 3, "direction": "E", "wasHit": false, "score": 528 } } } }