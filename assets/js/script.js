$(document).ready(initializeApp);
var firstCardClicked=null;
var secondCardClicked=null;
var matches=null;
var firstCardImage = null;
var secondCardImage = null;
var max_matches=9;
var attempts= 0;
var games_played=0;
var accuracy=0;
var cardIndex=null;

function initializeApp(){
  randomizeCards(backCardList);
  createCards(backCardList);
  $(".pig-card").click(handleCardClick);
  $('.modal').on('click', 'button', resetGame);
  games_played+=1;
  $(".modal").hide();
  displayStats();
  displayControls();
  $('.aboutModal').on('click', 'button', hideModal);
  // $('<button>').text("test").click(()=>balloonAnimation()).appendTo('header');
  $('.dancingPigWins').hide();
  $('.shadow').hide();
}

var backCardList=["pig1", "pig2", "pig3", "pig4", "pig5",
"pig6","pig7","pig8","pig9", "pig1", "pig2", "pig3", "pig4", "pig5",
"pig6","pig7","pig8","pig9"];

function randomizeCards(cardArray){
  var currentIndex=cardArray.length, temporaryValue, randomIndex;
  
  while(0!==currentIndex){
    randomIndex=Math.floor(Math.random()*currentIndex);
    currentIndex-=1;
    temporaryValue=cardArray[currentIndex];
    cardArray[currentIndex]=cardArray[randomIndex];
    cardArray[randomIndex]=temporaryValue;
  }
  return cardArray;
}


// function createCards(array){
//   for (var i = 0; i < 3; i++){
//     var row = $('<div>').addClass('rows')
//     for (var j = 0; j < 6; j++){
//       var k = i * 6 + j;
//       var cardContainer=$('<div>').addClass("card");
//       var cardFront = $('<div>').addClass("pig-card");
//       var cardBack = $('<div>').addClass("card-back").addClass(array[k]);
//       cardContainer.append(cardFront, cardBack);
//       row.append(cardContainer);
//     }
//     $('#card-container').append(row);
//   }
// }
function createCards(array){
  for (var i = 0; i < array.length; i++){
      var cardContainer=$('<div>').addClass("card");
      var cardFront = $('<div>').addClass("pig-card");
      var cardBack = $('<div>').addClass("card-back").addClass(array[i]);
      cardContainer.append(cardFront, cardBack);
    $('#card-container').append(cardContainer);
  }

}

function handleCardClick(event){  

  if(firstCardClicked===null){ 
    firstCardClicked=$(event.currentTarget);
    firstCardImage=$(firstCardClicked).siblings(".card-back").css("background-image");
    $(firstCardClicked).addClass("hidden");
  }else if(firstCardClicked!==null){
    secondCardClicked=$(event.currentTarget);
    secondCardImage=$(secondCardClicked).siblings(".card-back").css("background-image");
    $(secondCardClicked).addClass("hidden"); 
    attempts+=1;
    
    if(firstCardImage===secondCardImage){
      matches+=1;
      balloonAnimation();
      dancingPigWins();
      // dancingPigWins();
      if(matches===max_matches){
          youWon();
        }
        firstCardClicked=null;
        secondCardClicked=null;
    }else{
      $(".pig-card").off('click');
      setTimeout(function(){ 
        $(firstCardClicked).removeClass("hidden");
        firstCardClicked=null;
        $(secondCardClicked).removeClass("hidden"); 
        secondCardClicked=null;
        $(".pig-card").click(handleCardClick);
      }, 1000);
    }
  }
  displayStats();
}
function youWon(){
  $(".modal").show();
  $('.shadow').show();
}
function calculateAccuracy(){

  if(attempts===0){
    return 0;
  }
  accuracy = matches / attempts;
  return accuracy.toFixed(1);
}

function displayStats(){
  var resultAccuracy=calculateAccuracy();
  var gamePlayed= $('<div>').attr("id", "games-played").text('Games Played: '+games_played);
  var attempt= $('<div>').attr("id", "attempts").text('Attempts: '+attempts);
  var result= $('<div>').text('Result').attr("id", "accuracy").text('Accuracy: '+resultAccuracy);
  $('.stats').text('STATS').append(gamePlayed).append(attempt).append(result);
}

function displayControls(){
  var resetButton= $('<button>').attr("id", "reset").text('Reset').click(resetGame);
  var playButton= $('<button>').attr("id", "play").text('Play').click(play_audio);
  var stopButton= $('<button>').attr("id", "stop").text('Stop').click(play_audio);
  var aboutButton= $('<button>').attr("id", "about").text('About').click(aboutModal);
  var audio = $('<audio>').attr('id','backgroundMusic');
  var audioControls = $('<div>').addClass('audioControls').append(playButton).append(stopButton);
  var innerControl=$('<innerControl>').append(resetButton).append(audio).append(audioControls).append(aboutButton);
  $('<source>').attr({src:'./assets/sounds/bensound-buddy.mp3',type:'audio/mpeg'}).appendTo(audio);
  $('.outerControl').append(innerControl);
}

function resetStats(){
  matches=0;
  attempts=0;
  games_played+=1;
  
  displayStats();
  $(".pig-card").removeClass('hidden');
  $(".modal").hide();
  $('.shadow').hide();
}

function resetGame(){
  $('#card-container').html('')
  randomizeCards(backCardList);
  createCards(backCardList);
  resetStats();
  $(".pig-card").click(handleCardClick);
}

function play_audio(me){
  var myAudio = document.getElementById('backgroundMusic');
  var click = me.currentTarget.innerText; 
  if(click=='Play'){
    myAudio.play();
  }
  if(click=='Stop'){
    myAudio.pause();
  }
}
function aboutModal(){
    $('.aboutModal').removeClass('hidden');
    $('.shadow').show();
  }
  
  function hideModal(){
    $('.aboutModal').addClass('hidden');
    $('.shadow').hide();
}
function balloonAnimation(){
  var top =$('body').parent().height();
  console.log(top);
  if($('.balloon1').position().top < 0 ){
    $('.balloon1').css('top',top);
    $('.balloon2').css('top',top+50);
    $('.balloon1, .balloon2').animate({
      top: '-600'
    },6000);
  } else  {
    $('.balloon1, .balloon2').animate({
      top: '-600'
    },6000);
  }
  // $('.balloon1, .balloon2').animate({
  //   top: '-600'
  // },6000);
}

// function balloonAnimation(){
//   var top =$('.balloon1').position().top;
//   console.log(top)
//   if(top == -300){
//     $('.balloon1, .balloon2').css('top',600);
//     $('.balloon1, .balloon2').animate({
//       top: '-300'
//     },6000);
//   }
//   if(top ==600){
//     $('.balloon1, .balloon2').animate({
//       top: '-300'
//     },6000);
//   }
// }

function dancingPigWins(){
  $('.dancingPigWins').fadeIn();
  setTimeout(function() {
    $('.dancingPigWins').fadeOut("fast", function(){
      $('.dancingPigWins').hide();
    });
  }, 2000);

}

