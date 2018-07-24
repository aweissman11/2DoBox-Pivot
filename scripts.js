


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









