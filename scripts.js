


$('.save-btn').on('click', createIdea);
$('.bottom-box').on('click', '.upvote', upvoteFunc);
$('.bottom-box').on('click', '.downvote', downvoteFunc);
$('.bottom-box').on('click', '.delete-button', deleteFunc);
$('.bottom-box').on('keyup', '.title-of-card', editContent);
$('.bottom-box').on('keyup', '.body-of-card', editContent);
$('.bottom-box').on('keydown', '.title-of-card', enterKeySubmits);
$('.bottom-box').on('keydown', '.body-of-card', enterKeySubmits);
$('#search-input').on('keyup', searchFunc);

pageLoadDisplay();

function searchFunc() {
  var value = $(this).val().toLowerCase();
  $('.bottom-box div').filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
};

function pageLoadDisplay() {
    var storedIdeasArray = fetchArray();
    $('.bottom-box').text('');
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
    writeLocalStorageArray(storedIdeasArray);
    prependCard(newIdeaCard);
}

function createCardObject(title, body) {
    this.title = title;
    this.body = body;
    this.quality = 2;
    this.id = Date.now();
}

function writeLocalStorageArray(objectArray) {
  var stringedObjectArray = JSON.stringify(objectArray);
  localStorage.setItem('stored-array', stringedObjectArray);
}

function prependCard(cardObject) {
    var thisNewCard = newCard(cardObject.id, cardObject.title, cardObject.body, cardObject.quality);
    $('.bottom-box').prepend(thisNewCard);
}

function newCard(id , title , body , quality) {
    var currentQuality = setQualityRating(quality);
    return '<div data-unid=' + id + ' class="card-container"><h2 class="title-of-card" contenteditable>'  
        + title +  '</h2>'
        + '<button class="delete-button"></button>'
        +'<p class="body-of-card" contenteditable>'
        + body + '</p>'
        + '<button class="upvote"></button>' 
        + '<button class="downvote"></button>'
        + '<button class="complete-task"></button>' 
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
      if (anything.id == thisArticleId && anything.quality < 4) {
        anything.quality++
      }
    })
    writeLocalStorageArray(wholeArray);
    pageLoadDisplay();
}

function downvoteFunc() {
    var thisArticleId = $(event.target).parent().data('unid');
    var wholeArray = fetchArray();
    var upThisArticle = wholeArray.forEach(function (anything) {
      if (anything.id == thisArticleId && anything.quality > 0) {
        anything.quality--
      }
    })
    writeLocalStorageArray(wholeArray);
    pageLoadDisplay();
}

function deleteFunc() {
    var thisArticleId = $(event.target).parent().data('unid');
    var wholeArray = fetchArray();
    var newWholeArray = wholeArray.filter(function (anything) {
        return anything.id !== thisArticleId
    })
    writeLocalStorageArray(newWholeArray);
    pageLoadDisplay();
}

function editContent() {
    var thisArticleId = $(event.target).parent().data('unid');
    var clickedText = $(event.target).text();
    var wholeArray = fetchArray();
    var clickedElementClass = $(event.target).attr('class');
    var changeText = wholeArray.filter(function (anything) {
      if (anything.id == thisArticleId && clickedElementClass === 'body-of-card') {
        anything.body = clickedText;
      } else if (anything.id == thisArticleId && clickedElementClass === 'title-of-card') {
        anything.title = clickedText;
      }
    })
    writeLocalStorageArray(wholeArray);
}

function bodyOrTitle(anything) {
    if (anything.id == thisArticleId && clickedElementClass === 'body-of-card') {
      anything.body = clickedText;
    } else if (anything.id == thisArticleId && clickedElementClass === 'title-of-card') {
      anything.title = clickedText;
    }
}

function enterKeySubmits(e) {
  if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      e.target.blur();
  }
};

// function editBodyText() {
//   var thisArticleId = $(event.target).parent().data("unid");
//   var thisBodyText = $(event.target).text();
  // var changeThisArticle = arrayOfObject.filter(function (anything) {
  //   if (anything.uniqueID == thisArticleId) {
  //     anything.body = thisBodyText;
  //   }
  // })

//   stringAndStore(arrayOfObject);
// };



// Marking a TODO as completed
// When viewing the TODO list:

// Each TODO in the list should have a button called Completed Task.
// When a user clicks the Completed Task button, the idea should be either grayed out and/or shown with a strike through text.
// On reloading the page, the completed TODOs should be exempted (but not deleted) from the list.
// When the user clicks the show completed TODOs, the completed TODOs should be loaded back onto the top of the TODO list.
// Importance
// Each TODO should be given a level of importance.

// As a user, I should be able to change the level of importance by up-voting or down-voting that specific TODO.
// Each TODO should start with a level of Normal.
// Levels of importance are as follows:

// 1) Critical

// 2) High

// 3) Normal

// 4) Low

// 5) None

// The change of importance should persist after a page refresh.
// Recent TODOs
// The application should only show the ten most recent TODOS.

// The application should contain a button labeled Show more TODOs ....
// When a user clicks on the Show more TODOs... button, this list should load additional messages from the past.
// Filter by Importance
// The application should allow users to filter the TODO list based on level of importance.

// Your application should have 5 buttons corresponding to each level of importance (Critical, High, Normal, Low, and None).
// When one of the filter buttons is clicked, the TODO list should only display TODOs with the selected importance.



// Extensions
// Character Counter
// The application is able to count the number of characters inside of the input field in real time.

// As the user types, the character count should increment up.
// If the user deletes characters, then the character count should decrease.
// Submit button disabled based on character count
// The submit button should be disabled when there is not valid content in both input fields and if the input field character count exceeds 120 characters.

// TODO Due Dates
// When viewing the TODO list:

// Each TODO should have an option to set a due date for the specific TODO.
// Once a TODO’s due date is reached, the TODO should show a visual indication that it is past due if it has not been completed.
// Note: TimeZones are hard - consider using a library like MomentJS




