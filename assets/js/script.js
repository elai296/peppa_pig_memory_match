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

function initializeApp(){
    $(".lfz-card").click(handleCardClick);
    $('.modal').on('click', 'button', resetStats);
    games_played+=1;
    $(".modal").hide();
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
        $(".lfz-card").off('click');
        setTimeout(function(){ 
          $(firstCardClicked).removeClass("hidden");
          firstCardClicked=null;
          $(secondCardClicked).removeClass("hidden");
          secondCardClicked=null;
          $(".lfz-card").click(handleCardClick);
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
    $(".lfz-card").removeClass('hidden');
    $(".modal").hide();
  }
