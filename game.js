var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var level=0;
var once=false;

function nextSequence() {
  userClickedPattern=[];
  level++;

    $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

}

$(".btn").click(function(button){
  playSound($(this).attr("id"));
  animatePress($(this).attr("id"));
  userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  var index=userClickedPattern.length-1;

//  console.log(userClickedPattern);
checkAnswer(index);

});

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3")
  audio.play();
}

function animatePress(currentcolor){
  $("#"+currentcolor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentcolor).removeClass("pressed");
  },100);

}

function startOver(){
  level=0;
  gamePattern=[];
  userClickedPattern=[];
  $("h1").text("Game Over,Press Any Key to Restart");
  $(document).keypress(function(){
    nextSequence();
  })
}

function checkAnswer(currentLevel){
  console.log("User="+userClickedPattern+" Game="+gamePattern);
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
      console.log("success");
      setTimeout(function(){
        nextSequence();
      },1000);
  }

  }
  else{
    console.log("failure");
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
}
}










$(document).keypress(function(){
  if(once==false){
    once=true;
    nextSequence();
  }
  else{
    console.log(once);
  }
})
