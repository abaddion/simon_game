// const express = require("express");
//
// const app = express();
//
// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/index.html");
// });


var buttonColors = ["red", "blue", "green", "yellow"];     // 2. create an array in variable called buttonColors to define colors of the buttons

var gamePattern = [];  // 4. create an empty array gamePattern
var userClickedPattern =[];  // 8. create an empty array calle userClickedPattern

var started = false;  //14. You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var level = 0;  //16. Create a new variable called level and start at level 0.


$(document).keydown(function() {  //15. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {      // 7. use jQuery to detect when any of the button get clicked and trigger a handler function, inside the function, create a variable userChosenColor to store the id of the button that got clicked
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);   // 9. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);  //20. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.

});


function checkAnswer(currentLevel) {    //19. Create a new function called checkAnswer(), it should take one input with the name currentLevel

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {    //21. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (userClickedPattern.length === gamePattern.length) {   //22. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.

      setTimeout(function() {   //23. Call nextSequence() after a 1000 millisecond delay.
        nextSequence();
      }, 1000);
    }

  } else {


    playSound("wrong");     //24. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("body").addClass("game-over");
    $("#level-title").text("Game Over! Press Any Key to Restart.");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();  //26. Call startOver() if the user gets the sequence wrong.

  }
}

function nextSequence() {   // 1. create a new function called nextSequence inside which you create a randomNumber between 0 to 3

  userClickedPattern = [];  //23. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  level++;   //17. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  $("#level-title").text("Level" + level);  //18. Inside nextSequence(), update the h1 with this change in the value of level.

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];   // 3. create new variable randomChosenColor and use randomNumber to chose a random color from buttonColors array
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); // 5. use jQuery to select the button with the same id as the randomChosenColor and make it flash

  playSound(randomChosenColor); //12. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.

}


function animatePress(currentColor) {       //13. Create a new function called animatePress(), it should take a single input parameter called currentColour. Use jQuery to add this pressed class to the button that gets clicked inside animatePress(). Use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}


function playSound(name) {  //10. Create a new function called playSound() that takes a single input parameter called name.
  var audio = new Audio("sounds/" + name + ".mp3");   // 6. use JavaScript to play sound for the button color selected
    audio.play();   //11. Take the code we used to play sound in the nextSequence() function and add it to playSound().
}


function startOver() {  //25. Create a new function called startOver().
  level = 0;   //27. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  gamePattern = [];
  started = false;
}



// app.listen(3000, function(req, res) {
//   res.sendFile(__dirname + "/index.html");
// });
