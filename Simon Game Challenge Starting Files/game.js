var gamePattern=[];
// var gamePattern = ["blue","yellow"]
var buttonColors=["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var level= 0;
// var level=1
var started = false;
// var started = true;

$(document).keypress(function(e){
  if(!started){
    nextSequence();
    $("#level-title").text("Level " + level);
    started=true;
  }
})


function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber= Math.floor(Math.random()*4);
  var randomChosenColour=  buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  ;
}


$('.btn').click(function(e){
var userChosenColour=e.target.id;
// var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function playSound(name){
  var audio= new Audio(`sounds/${name}.mp3`);
  audio.play();

}

function animatePress(currentColour){
  $(`.${currentColour}`).addClass('pressed');
  setTimeout(function(){
    $('.btn').removeClass('pressed');
  },100)
}



function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length==userClickedPattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  }
  else {
    console.log("wrong");
    var wrongsound= new Audio('sounds/wrong.mp3');
    wrongsound.play();
    $('body').addClass('game-over');
    setTimeout(function(){
    $('body').removeClass('game-over');
  },200)
  $('#level-title').text('Game Over, Press Any Key to Restart');
  startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern= [];
  started = false;

}
