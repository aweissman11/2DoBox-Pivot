


$('.save-btn').on('click', createIdea);
$('.bottom-box').on('click', '.upvote', upvoteFunc);
// $('.downvote').on('click', downvoteFunc);

pageLoadDisplay();

function pageLoadDisplay() {
    var storedIdeasArray = fetchArray();
    storedIdeasArray.forEach(function(card) {
        prependCard(card);
    })
};

function fetchArray() {
    var retrieveIdea = localStorage.getItem('stored-array');
    var parsedRetrievedIdea = JSON.parse(retrieveIdea);
    return (parsedRetrievedIdea !== null ? parsedRetrievedIdea : []);
}

//This runs when you hit the save button
function createIdea(e) {
    e.preventDefault();
    storedIdeasArray = fetchArray();
    var titleInput = $('#title-input').val();
    var bodyInput = $('#body-input').val();
    newIdeaCard = new createCardObject(titleInput, bodyInput);
    storedIdeasArray.push(newIdeaCard);
    createLocalStorageArray(storedIdeasArray);
    prependCard(newIdeaCard);
}

function createCardObject(title, body) {
    this.title = title;
    this.body = body;
    this.quality = 2;
    this.id = Date.now();
}

function createLocalStorageArray(objectArray) {
  var stringedObjectArray = JSON.stringify(objectArray);
  localStorage.setItem('stored-array', stringedObjectArray);
}

function prependCard(cardObject) {
    var thisNewCard = newCard(cardObject.id, cardObject.title, cardObject.body, cardObject.quality);
    $( ".bottom-box" ).prepend(thisNewCard);
}

function newCard(id , title , body , quality) {
    var currentQuality = setQualityRating(quality);
    return '<div data-unid=' + id + ' class="card-container"><h2 class="title-of-card">'  
            + title +  '</h2>'
            + '<button class="delete-button"></button>'
            +'<p class="body-of-card">'
            + body + '</p>'
            + '<button class="upvote"></button>' 
            + '<button class="downvote"></button>' 
            + '<p class="quality">' + 'quality: ' + '<span class="qualityVariable">' + currentQuality + '</span>' + '</p>'
            + '<hr>' 
            + '</div>';
};


function setQualityRating(qualityValue) {
    var qualityStringIndex = ['None', 'Low', 'Normal', 'High', 'Critical'];
    var thisQuality = qualityStringIndex[qualityValue];
    return thisQuality;
}

function upvoteFunc() {
    var thisArticleId = $(event.target).parent().data('unid');
    var wholeArray = fetchArray();

    var upThisArticle = wholeArray.forEach(function (anything) {
      if (anything.id == thisArticleId) {
        anything.quality++
        return anything.quality;
      }
    })
    console.log('test ' + upThisArticle);


}

    // then return the index value 
    // increment it
    // Save it or send it where it needs to go
    // maybe:
    //     if (downvoteBtn) {
    //             ?? (this.qualityStringIndex.index > qualityStringIndex.length ? this.qualityStringIndex.index++)???
    //         if (this.qualityStringIndex.index < qualityStringIndex.length) {
    //         this.qualityStringIndex--;
    //         }
    //     } else if (upvoteBtn) {
    //         if (this.qualityStringIndex.index < qualityStringIndex.length) {
    //         this.qualityStringIndex++;
    //         }
    //     }
    // return this.qualityStringIndex.text()

// var title = $('#title-input').val();
// var body = $('#body-input').val();
// var numCards = 0;
// var qualityVariable = "swill";

//This is the stringAndStore function
//This shouldn't be an anonymous function
// $.each(localStorage, function(key) {
//     var cardData = JSON.parse(this);
//     numCards++;
// });

// var localStoreCard = function() {
//     var cardString = JSON.stringify(cardObject());
//     localStorage.setItem('card' + numCards  , cardString);
// }

//Anonymous
//This needs to be fixed
//I think return is causing the page to refresh. 
//We also need this to run the function that saves the input
// $('.save-btn').on('click', function(event) {
//     event.preventDefault();
//     if ($('#title-input').val() === "" || $('#body-input').val() === "") {
//        return false;
//     };  

//     numCards++;
//     $( ".bottom-box" ).prepend(newCard('card' + numCards, $('#title-input').val(), $('#body-input').val(), qualityVariable)); 
//     localStoreCard();
//     $('form')[0].reset();
// });


// Use indexes here instead of the words.
// That way we can just increment them instead of testing for the word match every single time
// Something like: 

// Fire this on one of the button clicks







//this should also not be an anonymous function
// $(".bottom-box").on('click', function(event){
//     var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
//     var qualityVariable;

//     if (event.target.className === "upvote" || event.target.className === "downvote"){

//         if (event.target.className === "upvote" && currentQuality === "plausible"){
//             qualityVariable = "genius";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "upvote" && currentQuality === "swill") {
//             qualityVariable = "plausible";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "downvote" && currentQuality === "plausible") {
//             qualityVariable = "swill"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "genius") {
//             qualityVariable = "plausible"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "swill") {
//             qualityVariable = "swill";
        
//         } else if (event.target.className === "upvote" && currentQuality === "genius") {
//             qualityVariable = "genius";
//         }


//     //this should be its own function
//     var cardHTML = $(event.target).closest('.card-container');
//     var cardHTMLId = cardHTML[0].id;
//     var cardObjectInJSON = localStorage.getItem(cardHTMLId);
//     var cardObjectInJS = JSON.parse(cardObjectInJSON);

//     cardObjectInJS.quality = qualityVariable;

//     var newCardJSON = JSON.stringify(cardObjectInJS);
//     localStorage.setItem(cardHTMLId, newCardJSON);
//     }
   
//    //This should absolutely be it's own function
//     else if (event.target.className === "delete-button") {
//         var cardHTML = $(event.target).closest('.card-container').remove();
//         var cardHTMLId = cardHTML[0].id;
//         localStorage.removeItem(cardHTMLId);
//     }
// });
      










