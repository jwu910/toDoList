console.log("Connected");
var newToDo;
var addToDo = $("#addToDo");
var toDoEntry = $("#toDoEntry");
var listItems = [].slice.call($('#listItems')[0].children);

// API key variables
var clientId = '';
var apiKey = '';
var scopes = 'https://www.googleapis.com/auth/gmail.readonly ' + 'https://www.googleapis.com/auth/gmail.send';

// Add new item
addToDo.on("click", function() {
    toDoEntry.toggleClass("hidden");
    toDoEntry.val("");
    toDoEntry.focus();
});

// This could become a "create new to do function which is called upon keypress of +ToDo button"
toDoEntry.on("keypress", function(event) {
    if (event.which === 13) {
        console.log("You Pressed Enter; I should do something");
        // clear toDoEntry.val() if only white space entered
        toDoEntry.val($.trim(toDoEntry.val()));

        if (toDoEntry.val() !== "") {
            newToDo = "<li><span><i class='fa fa-trash fa-lg' aria-hidden='true'></i></span> " + toDoEntry.val() + "</li>";
            // $(newToDo).appendTo($("ul"));
            $("ul").append(newToDo);
            toDoEntry.val("");
            toDoEntry.toggleClass("hidden");
                // once new list added and field cleared, we need to hide the to do list agian
        }
        else {
            toDoEntry.val("");
            toDoEntry.toggleClass("hidden");
        }
    }
});

// delete entry
$("ul").on("click", "span", function(event) {
    $(this).parent().fadeOut(350, function() {
        $(this).remove();
    });
    event.stopPropogation(); // stops the span click from bubbling to li
});

// confirm list clear
function clearConfirm() {
    var userContinue = confirm('Clear entire list?');  

    listItems = [].slice.call($('#listItems')[0].children);

    if (userContinue) {
        listItems.forEach(function(item) {
            item.remove();
        })
    }
}


// Start API functions for gmail

function sendMessage(headers_obj, message, callback) {
    var email = '';
    
    for(var header in headers_obj)
    email += header += ": "+headers_obj[header]+"\r\n";
    email += "\r\n" + message;
    
    var sendRequest = gapi.client.gmail.users.messages.send({
        'userId': 'me',
        'resource': {
            'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
        }
    });
    return sendRequest.execute(callback);
}

    /**
 * Create Draft email.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} email RFC 5322 formatted String.
 * @param  {Function} callback Function to call when the request is complete.
 */
function createDraft(userId, email, callback) {
  // Using the js-base64 library for encoding:
  // https://www.npmjs.com/package/js-base64
  var base64EncodedEmail = Base64.encodeURI(email);
  var request = gapi.client.gmail.users.drafts.create({
    'userId': userId,
    'resource': {
      'message': {
        'raw': base64EncodedEmail
      }
    }
  });
  request.execute(callback);
}