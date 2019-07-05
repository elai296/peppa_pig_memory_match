$(document).ready(initializeApp);
var firstCardClicked={'card-back':null, 'value':null};
var secondCardClicked={'card-back':null, 'value':null};
var matches=null;

function initializeApp(){
    $(".lfz-card").click(handleCardClick);
    
}

function handleCardClick(event){
    if ( firstCardClicked.card == null){
        firstCardClicked.card = event.currentTarget;
        $(firstCardClicked.card).addClass("hidden");
    } else if ( firstCardClicked.card != null && secondCardClicked.card == null){
        secondCardClicked.card= event.currentTarget;
        $(secondCardClicked.card).addClass("hidden");
    } else {
        // var card =event.currentTarget;
        // console.log(card);
        $(firstCardClicked.card).removeClass("hidden");
        firstCardClicked.card=null;
        $(secondCardClicked.card).removeClass("hidden");
        secondCardClicked.card=null;
    }

}

// var firstCardClicked=null;
//         var secondCardClicked=null;
//         var matches=null;

//         if(firstCardClicked===null){
//             firstCardClicked=$(event.currentTarget);
//         }else if(firstCardClicked!==null){
//             secondCardClicked=$(event.currentTarget);
//         }

//         if(firstCardClicked!==null&&secondCardClicked!==null){
//             firstCardClicked=$()
//         }