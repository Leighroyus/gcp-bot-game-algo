function isEven(value){
  if (value%2 == 0)
      return true;
  else
      return false;
};

function MyPlayerY_to_HiScorePlayerY(my_player_y,hi_score_player_y){
  if (my_player_y > hi_score_player_y)
      return 'Below';
  else if (my_player_y == hi_score_player_y)
      return 'Same';
  else if (my_player_y < hi_score_player_y)
      return 'Above';
};

function MyPlayerX_to_HiScorePlayerX(my_player_x,hi_score_player_x){
  if (my_player_x > hi_score_player_x)
      return 'Right';
  else if (my_player_x == hi_score_player_x)
      return 'Same';
  else if (my_player_x < hi_score_player_x)
      return 'Left';
};

//function WhereCanMyPlayerMove(other_player_to_left,other_player_to_right,other_player_above,other_player_below){

//};


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
  var my_player_index;

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

  var other_player_to_left = 0;
  var other_player_to_right = 0;
  var other_player_above = 0;
  var other_player_below = 0;

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

        my_player_index = i;

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

  for (var i = 0; i < player_data.length; i++) {
    Object.entries(player_data[i]).forEach(([key, val]) => {
      
      if (key == 'x') {
        temp_x = val;
      }
      if (key == 'y') {
        temp_y = val;
      }
    })

    if (i != my_player_index)
    {


          if (temp_x == my_player_x + 1 && temp_y == my_player_y)
          {
            //player to the right
            other_player_to_right = 1;
          }
          if (temp_x == my_player_x - 1 && temp_y == my_player_y)
          {
            //player to the left
            other_player_to_left = 1;
          }
          
          if (temp_y == my_player_y + 1 && temp_x == my_player_x)
          {
            //player below me
            other_player_below = 1;
          }
          if (temp_y == my_player_y - 1 && temp_x == my_player_x)
          {
            //player above me
            other_player_above = 1;
          }

        
    }
  }

  console.log('Player with the highest score: ' + hi_score_player_name + ', with a score of: ' + hi_score_player_score)
  console.log('Player with the highest score - X Pos: ' + hi_score_player_x)
  console.log('Player with the highest score - Y Pos: ' + hi_score_player_y)
  console.log('Player with the highest score - Direction: ' + hi_score_player_direction)
  
  console.log('My player x: ' + my_player_x)
  console.log('My player y: ' + my_player_y)
  console.log('My player direction: ' + my_player_direction)

  //first decide if my player is Below, the Same or Above the hi score player 
  console.log('My player vertically is [' + MyPlayerY_to_HiScorePlayerY(my_player_y,hi_score_player_y) + '] the high score player.')
  
  //next decide if my player is to the Left, the Same or to the Right of the hi score player 
  console.log('My player horizontally is to the [' + MyPlayerX_to_HiScorePlayerX(my_player_x,hi_score_player_x) + '] of the high score player.')

  //check if any player is will block my move
  //get direction that my player can move that is free from another player
  if (other_player_to_left == 1)
  {
    console.log('My player CANT move LEFT');
  }
  if (other_player_to_right == 1)
  {
    console.log('My player CANT move RIGHT');
  }
  if (other_player_above == 1)
  {
    console.log('My player CANT move UP');
  }
  if (other_player_below == 1)
  {
    console.log('My player CANT move DOWN');
  }

  //check if my player can throw at the high score player
  if((my_player_x + 1 == hi_score_player_x) || (my_player_x + 2 == hi_score_player_x))
  {
     //check if my player is facing East
     if (my_player_direction != 'E')
     {
        if(my_player_direction == 'N')
        {
          console.log('** DEGUB case 1 **')
          res.send('R');
        }
        if(my_player_direction == 'S')
        {
          console.log('** DEGUB case 2 **')
          res.send('L');
        }
        if(my_player_direction == 'W')
        {
          console.log('** DEGUB case 3 **')
          res.send('R');
        }
     }
     //is facing at the high score player - make a throw!
     if (my_player_direction == 'E')
     {
      console.log('** DEGUB case 4 **')
        res.send('T');
     }
  } 
  else if ((my_player_x - 1 == hi_score_player_x) || (my_player_x - 2 == hi_score_player_x))
  {
    //check if my player is facing West
    if (my_player_direction != 'W')
    {
       if(my_player_direction == 'N')
       {
        console.log('** DEGUB case 5 **')
         res.send('L');
       }
       if(my_player_direction == 'S')
       {
        console.log('** DEGUB case 6 **')
         res.send('R');
       }
       if(my_player_direction == 'E')
       {
        console.log('** DEGUB case 7 **')
         res.send('L');
       }
    }
    //is facing at the high score player - make a throw!
    if (my_player_direction == 'W')
    {
      console.log('** DEGUB case 7 **')
       res.send('T');
    }

  }
  else if ((my_player_y + 1 == hi_score_player_y) || (my_player_y + 2 == hi_score_player_y))
  {
    //check if my player is facing South
    if (my_player_direction != 'S')
    {
       if(my_player_direction == 'N')
       {
        console.log('** DEGUB case 8 **')
         res.send('L');
       }
       if(my_player_direction == 'E')
       {
        console.log('** DEGUB case 9 **')
         res.send('R');
       }
       if(my_player_direction == 'W')
       {
        console.log('** DEGUB case 10 **')
         res.send('L');
       }
    }
    //is facing at the high score player - make a throw!
    if (my_player_direction == 'S')
    {
      console.log('** DEGUB case 11 **')
       res.send('T');
    }

  }
  else if ((my_player_y - 1 == hi_score_player_y) || (my_player_y - 2 == hi_score_player_y))
  {
    //check if my player is facing North
    if (my_player_direction != 'N')
    {
       if(my_player_direction == 'S')
       {
        console.log('** DEGUB case 12 **')
         res.send('R');
       }
       if(my_player_direction == 'E')
       {
        console.log('** DEGUB case 13 **')
         res.send('L');
       }
       if(my_player_direction == 'W')
       {
        console.log('** DEGUB case 14 **')
         res.send('R');
       }
    }
    //is facing at the high score player - make a throw!
    if (my_player_direction == 'N')
    {
      console.log('** DEGUB case 15 **')
       res.send('T');
    }

  }
  //hunt hi score player
  else {

        if (MyPlayerY_to_HiScorePlayerY(my_player_y,hi_score_player_y) == 'Below')
        {
              //check if my player is facing South
              if (my_player_direction != 'S')
              {
                  if(my_player_direction == 'N')
                  {
                    console.log('** DEGUB case 16 **')
                    res.send('L');
                  }
                  if(my_player_direction == 'E')
                  {
                    console.log('** DEGUB case 17 **')
                    res.send('R');
                  }
                  if(my_player_direction == 'W')
                  {
                    console.log('** DEGUB case 18 **')
                    res.send('L');
                  }
              }
              //if player is heading in the required direction then move forward
              if (my_player_direction == 'S')
              {
                console.log('** DEGUB case 19 **')
                res.send('F');
              }
        }

        if (MyPlayerY_to_HiScorePlayerY(my_player_y,hi_score_player_y) == 'Above')
        {
              //check if my player is facing North
              if (my_player_direction != 'N')
              {
                  if(my_player_direction == 'S')
                  {
                    console.log('** DEGUB case 20 **')
                    res.send('R');
                  }
                  if(my_player_direction == 'E')
                  {
                    console.log('** DEGUB case 21 **')
                    res.send('L');
                  }
                  if(my_player_direction == 'W')
                  {
                    console.log('** DEGUB case 22 **')
                    res.send('R');
                  }
              }
              //if player is heading in the required direction then move forward
              if (my_player_direction == 'N')
              {
                console.log('** DEGUB case 23 **')
                res.send('F');
              }
        }

        if(MyPlayerX_to_HiScorePlayerX(my_player_x,hi_score_player_x) == 'Left')
        {
              //check if my player is facing East
              if (my_player_direction != 'E')
              {
                  if(my_player_direction == 'N')
                  {
                    console.log('** DEGUB case 24 **')
                    res.send('R');
                  }
                  if(my_player_direction == 'S')
                  {
                    console.log('** DEGUB case 25 **')
                    res.send('L');
                  }
                  if(my_player_direction == 'W')
                  {
                    console.log('** DEGUB case 26 **')
                    res.send('R');
                  }
              }
            //if player is heading in the required direction then move forward
            if (my_player_direction == 'E')
            {
              console.log('** DEGUB case 27 **')
              res.send('F');
            }
        }

        if(MyPlayerX_to_HiScorePlayerX(my_player_x,hi_score_player_x) == 'Right')
        {
              if (my_player_direction != 'W')
              {
                  if(my_player_direction == 'N')
                  {
                    console.log('** DEGUB case 28 **')
                    res.send('L');
                  }
                  if(my_player_direction == 'S')
                  {
                    console.log('** DEGUB case 29 **')
                    res.send('R');
                  }
                  if(my_player_direction == 'E')
                  {
                    console.log('** DEGUB case 30 **')
                    res.send('L');
                  }
              }
              //is facing at the high score player - make a throw!
              if (my_player_direction == 'W')
              {
                console.log('** DEGUB case 31 **')
                res.send('F');
              } 
        }


  }

  //old code
  /*
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
*/

});

app.listen(process.env.PORT || 8080);


// { "_links": { "self": { "href": "https://gcpbotgame-jl6m2wkduq-uc.a.run.app" } }, "arena": { "dims": [6, 4], "state": { "https://cloud-game-random-bot-z3eu2gxmuq-uc.a.run.app": { "x": 4, "y": 3, "direction": "W", "wasHit": true, "score": -329 }, "https://cloudbowl-samples-nodejs-jl6m2wkduq-uc.a.run.app": { "x": 5, "y": 3, "direction": "S", "wasHit": false, "score": -77 }, "https://gcpbotgame-jl6m2wkduq-uc.a.run.app": { "x": 4, "y": 2, "direction": "W", "wasHit": false, "score": -122 }, "https://cloudbowl-samples-nodejs-45hqnxtrtq-uc.a.run.app": { "x": 2, "y": 3, "direction": "E", "wasHit": false, "score": 528 } } } }