var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var flag = 0;

$(document).keypress(function() {
  if (flag == 0) { //i.e. for first key press after game started
    $("#level-title").text("Level " + level); //change heading to level 0
    nextSequence();
    flag = 1;
  }
});

$(".btn").click(function() { //when user clicks a button
  var userChosenColour = $(this).attr("id"); // to get the id of the button clicked by user
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).delay(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) { // if most recent matches then
    if (userClickedPattern.length === gamePattern.length) { //if user completed all
      setTimeout(nextSequence, 1000);
    }
  } else {
    wrongAnswer();
    startOver();
  }
}

function wrongAnswer() {
  playSound("wrong")

  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("Game Over, Press Any Key to Restart");
}

function startOver() {
  gamePattern = [];
  level = 0;
  flag = 0;
}
