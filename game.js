var buttonColors = ["green", "red", "yellow", "blue"];
gamePattern = [];
userClickedPattern = [];
var level = 0;
var flag = false;

function playSound(name) {
  var bgs = new Audio("sounds/" + name + ".mp3");
  bgs.play();
}
function gameOver() {
  $("h1").text("Game Over, Press any key to restart");
  var bgs = new Audio("sounds/wrong.mp3");
  bgs.play();
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  level = 0;
  gamePattern = [];
  flag = false;
}

function nextSequence() {
  level++;
  flag = true;
  $("h1").text("Level " + level);
  var randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColor);
  console.log(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
  userClickedPattern = [];
}

function animatePress(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function () {
    $("#" + name).removeClass("pressed");
  }, 100);
}

function checkAnswer(index) {
  if (userClickedPattern[index] == gamePattern[index]) console.log("success");
  else gameOver();

  if (index == level - 1) setTimeout(nextSequence, 1000);
}

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keydown", function () {
  if (!flag) nextSequence();
});
