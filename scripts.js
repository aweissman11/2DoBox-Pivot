$('.save-btn').on('click', createIdea);
$('#title-input').on('keyup', enableSaveBtn);
$('#body-input').on('keyup', enableSaveBtn);
$('.bottom-box').on('click', '.upvote', upvoteFunc);
$('.bottom-box').on('click', '.downvote', downvoteFunc);
$('.bottom-box').on('click', '.delete-button', deleteFunc);
$('.bottom-box').on('click', '.complete-btn', completeFunc);
$('.bottom-box').on('keyup', '.title-of-card', editContent);
$('.bottom-box').on('keyup', '.body-of-card', editContent);
$('.bottom-box').on('keydown', '.title-of-card', enterKeySubmits);
$('.bottom-box').on('keydown', '.body-of-card', enterKeySubmits);
$('#search-input').on('keyup', searchFunc);
$('.show-rest-btn').on('click', taskBtnPurpose);
$('.importance').on('click', filterImportance);
$('textarea').on('click', solidTextArea);

pageLoadDisplay();

function pageLoadDisplay() {
    var storedIdeasArray = fetchArray();
    $('.bottom-box').text('');
    storedIdeasArray.forEach(function(card) {
        prependCard(card);
    })
    hideTenth();
};

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
    $('#title-input').val('');
    $('#body-input').val('');
};

function createCardObject(title, body) {
    this.title = title;
    this.body = body;
    this.quality = 2;
    this.id = Date.now();
    this.classes = '';
};

function writeLocalStorageArray(objectArray) {
  var stringedObjectArray = JSON.stringify(objectArray);
  localStorage.setItem('stored-array', stringedObjectArray);
};

function fetchArray() {
    var retrieveIdea = localStorage.getItem('stored-array');
    var parsedRetrievedIdea = JSON.parse(retrieveIdea);
    return (parsedRetrievedIdea !== null ? parsedRetrievedIdea : []);
};

function prependCard(cardObject) {
    var thisNewCard = newCard(cardObject.id, cardObject.title, cardObject.body, cardObject.quality, cardObject.classes);
    $('.bottom-box').prepend(thisNewCard);
};

function newCard(id , title , body , quality, classes) {
    var currentQuality = setQualityRating(quality);
    return '<div data-unid=' + id + ' class="card-container' + classes + '">'
            + '<h2 class="title-of-card' + classes + '" contenteditable>'  
            + title +  '</h2>'
            + '<button class="delete-button"></button>'
            +'<p class="body-of-card" contenteditable>'
            + body + '</p>'
            + '<button class="upvote"></button>' 
            + '<button class="downvote"></button>'
            + '<button class="complete-btn"></button>' 
            + '<p class="quality">' + 'quality: ' + '<span class="qualityVariable">' + currentQuality + '</span>' + '</p>'
            + '<hr>' 
            + '</div>';
};

function setQualityRating(qualityValue) {
    var qualityStringIndex = ['None', 'Low', 'Normal', 'High', 'Critical'];
    var thisQuality = qualityStringIndex[qualityValue];
    return thisQuality;
};

function enableSaveBtn() {
  saveBtn = $('.save-btn');
  titleInput = $('#title-input').val().length;
  bodyInput = $('#body-input').val().length;
  console.log('Title characters:', titleInput)
  console.log('Body characters:', bodyInput)
  if (titleInput == 0 || titleInput > 120) {
    saveBtn.prop("disabled", true);
  } else if (bodyInput == 0 || bodyInput > 120) {
    saveBtn.prop("disabled", true);
  } else {
    saveBtn.prop("disabled", false);
  }
};

function filterImportance() {
  var thisImportance = $(event.target).attr('id');
  var wholeArray = fetchArray();
  var newWholeArray = wholeArray.filter(function (anything) {
      return anything.quality == thisImportance;
  })
  $('.bottom-box').text('');
  newWholeArray.forEach(function(card) {
      prependCard(card);
  })
  hideTenth();
};

function toggleShowRestButton () {
 if ($('.bottom-box').children().length >= 10) {
   $('.show-rest-btn').show();
 } else {
   $('.show-rest-btn').hide();
 }
};

function taskBtnPurpose() {
  event.preventDefault();
  if ($('.show-rest-btn').text() == 'Show less') {
    hideTenth();
    $('.show-rest-btn').text('Show All Cards');
  } else {
    $('.bottom-box').children().show();
    $('.show-rest-btn').text('Show less');
  }
};

function hideTenth() {
 $('.bottom-box').children(":gt(9)").hide();
 toggleShowRestButton();
};

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
};

function completeFunc() {
  var thisArticleId = $(event.target).parent().data('unid');
  var wholeArray = fetchArray();
  var upThisArticle = wholeArray.forEach(function (anything) {
    if (anything.id == thisArticleId && anything.classes === '') {
      anything.classes = ' completed';
    } else if (anything.id == thisArticleId) {
      anything.classes = '';
    }
  })
  writeLocalStorageArray(wholeArray);
  pageLoadDisplay();
};



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
};

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
};

function deleteFunc() {
    var thisArticleId = $(event.target).parent().data('unid');
    var wholeArray = fetchArray();
    var newWholeArray = wholeArray.filter(function (anything) {
        return anything.id !== thisArticleId
    })
    writeLocalStorageArray(newWholeArray);
    pageLoadDisplay();
};

function bodyOrTitle(anything) {
    if (anything.id == thisArticleId && clickedElementClass === 'body-of-card') {
      anything.body = clickedText;
    } else if (anything.id == thisArticleId && clickedElementClass === 'title-of-card') {
      anything.title = clickedText;
    }
};

function enterKeySubmits(e) {
  if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      e.target.blur();
  }
};

function searchFunc() {
  var value = $(this).val().toLowerCase();
  $('.bottom-box div').filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
};

function solidTextArea() {
    $(this).css('resize', 'none');
};