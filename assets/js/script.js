$(document).ready(initializeApp);
let firstCardClicked=null;
let secondCardClicked=null;
let matches=null;
let firstCardImage = null;
let secondCardImage = null;
let max_matches=9;
let attempts= 0;
let games_played=0;
let accuracy=0;
let cardIndex=null;

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
  $('.dancingPigWins').hide();
  $('.shadow').hide();
  $('#stop').hide();
}

const backCardList=["pig1", "pig2", "pig3", "pig4", "pig5",
"pig6","pig7","pig8","pig9", "pig1", "pig2", "pig3", "pig4", "pig5",
"pig6","pig7","pig8","pig9"];

function randomizeCards(cardArray){
  let currentIndex=cardArray.length, temporaryValue, randomIndex;
  
  while(0!==currentIndex){
    randomIndex=Math.floor(Math.random()*currentIndex);
    currentIndex-=1;
    temporaryValue=cardArray[currentIndex];
    cardArray[currentIndex]=cardArray[randomIndex];
    cardArray[randomIndex]=temporaryValue;
  }
  return cardArray;
}

function createCards(array){
  for (let i = 0; i < array.length; i++){
      let cardContainer=$('<div>').addClass("card");
      let cardFront = $('<div>').addClass("pig-card");
      let cardBack = $('<div>').addClass("card-back").addClass(array[i]);
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
  let resultAccuracy=calculateAccuracy();
  let gamePlayed= $('<div>').attr("id", "games-played").text('Games Played: '+games_played);
  let attempt= $('<div>').attr("id", "attempts").text('Attempts: '+attempts);
  let result= $('<div>').text('Result').attr("id", "accuracy").text('Accuracy: '+resultAccuracy);
  let statsTitle = $('<div>').html('<strong>STATS</strong>').attr('id','stats-title');
  $('.stats').html(statsTitle).append(gamePlayed).append(attempt).append(result);
}

function displayControls(){
  let resetButton= $('<button>').attr("id", "reset").text('Reset').click(resetGame);
  let playButton= $('<button>').attr("id", "play").text('Play').click(play_audio);
  let stopButton= $('<button>').attr("id", "stop").text('Stop').click(play_audio);
  let aboutButton= $('<button>').attr("id", "about").text('About').click(aboutModal);
  let audio = $('<audio>').attr('id','backgroundMusic');
  let audioControls = $('<div>').addClass('audioControls').append(playButton).append(stopButton);
  let innerControl=$('<innerControl>').append(resetButton).append(audio).append(audioControls).append(aboutButton);
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
  let myAudio = document.getElementById('backgroundMusic');
  let click = me.currentTarget.innerText; 
  let play = document.getElementById('#play');
  let pause = document.getElementById('#stop');
  if(click=='Play'){
    myAudio.play();
    $('#stop').show();
    $('#play').hide();
  }
  if(click=='Stop'){
    myAudio.pause();
    $('#play').show();
    $('#stop').hide();
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
  let top =$('body').parent().height();
  $('.balloon1, .balloon2').stop();
  $('.balloon1').css('top',top);
  $('.balloon2').css('top',top+50);
  $('.balloon1, .balloon2').animate({
    top: '-600'},6000);
}

function dancingPigWins(){
  $('.dancingPigWins').fadeIn();
  setTimeout(function() {
    $('.dancingPigWins').fadeOut("fast", function(){
      $('.dancingPigWins').hide();
    });
  }, 2000);

}

