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
    games_played+=1;
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
        $(".modal").removeClass('hidden')
        
        //   $(".modal").show();
        // }else{
          //   $(".modal").hide
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
    accuracy = matches / attempts;
    return accuracy;
  }

  function displayStats(){
    var resultAccuracy=calculateAccuracy();
    $("#games-played").text(games_played);
    $("#attempts").text(attempts);
    $("#accuracy").text(resultAccuracy);
  }