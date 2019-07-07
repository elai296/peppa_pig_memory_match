$(document).ready(initializeApp);
var firstCardClicked=null;
var secondCardClicked=null;
var matches=null;
var firstCardImage = null;
var secondCardImage = null;

function initializeApp(){
    $(".lfz-card").click(handleCardClick);
         
}

// function handleCardClick(event){
    
//     if(firstCardClicked===null){
//         firstCardClicked=$(event.currentTarget);
//         firstCardImage=$(firstCardClicked).siblings(".card-back").css("background-image");
//         $(firstCardClicked).addClass("hidden");
//     }else if(firstCardClicked!==null){
//         secondCardClicked=$(event.currentTarget);
//         secondCardImage=$(secondCardClicked).siblings(".card-back").css("background-image");
//         $(secondCardClicked).addClass("hidden"); 
//         if(firstCardImage===secondCardImage){
//             console.log("they matched");
//                 matches+=1;
//                 // firstCardClicked=null;
//                 // secondCardClicked=null;
//             }else{
//                 setTimeout(function(){ 
//                    
//                 $(firstCardClicked).removeClass("hidden");}, 2000);
//                 setTimeout(function(){ 
//                   
//                 $(secondCardClicked).removeClass("hidden");}, 2000);
//                 console.log("not matched");
//                 // firstCardClicked=null;
//                 // secondCardClicked=null;
//             }
//         }
// }
function handleCardClick(event){

    if(firstCardClicked===null){ 
      firstCardClicked=$(event.currentTarget);
      firstCardImage=$(firstCardClicked).siblings(".card-back").css("background-image");
      $(firstCardClicked).addClass("hidden");
    }else if(firstCardClicked!==null){
      secondCardClicked=$(event.currentTarget);
      secondCardImage=$(secondCardClicked).siblings(".card-back").css("background-image");
      $(secondCardClicked).addClass("hidden"); 
      if(firstCardImage===secondCardImage){
        console.log("they matched");
        matches+=1;
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
  }