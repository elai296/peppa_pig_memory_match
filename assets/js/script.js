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
    $('.modal').on('click', 'button', resetStats);
    // $('.reset').on('click', resetGame);
    games_played+=1;
    $(".modal").hide();
    $('<button>').click(resetGame);
    var resetButton= $('<button>').text('reset').click(resetGame);
    $('.reset').append(resetButton);
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
      console.log("they matched");
      matches+=1;
      
      if(matches===max_matches){
        $(".modal").show();
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
        console.log("not matched");
      }
    }
    displayStats();
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
    $("#games-played").text(games_played);
    $("#attempts").text(attempts);
    $("#accuracy").text(resultAccuracy);
  }

  function resetStats(){
    console.log('Reset Stats Called');
    matches=0;
    attempts=0;
    games_played+=1;
    
    displayStats();
    $(".pig-card").removeClass('hidden');
    $(".modal").hide();
  }

  function resetGame(){
    $('#card-container').html('')
    randomizeCards(backCardList);
    createCards(backCardList);
  }
