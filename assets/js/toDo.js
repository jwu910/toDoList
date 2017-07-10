console.log("Connected");
var newToDo;
var addToDo = $("#addToDo");
var toDoEntry = $("#toDoEntry");
var listItems = [].slice.call($('#listItems')[0].children);

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

function sendEmail() {
    var message = [];

    // refresh listItems on fucntion call
    listItems = [].slice.call($('#listItems')[0].children);
    
    listItems.forEach(function(item) {
        message.push(item.innerText);
    })

    // reprint message with line breaks
    message = message.join("\n");


        console.log('sent');

}
//echo -e "Subject: Test Mail\r\n\r\nThis is a test mail" |msmtp --debug --from=default -t username@gmail.com
//http://www.techrapid.co.uk/2017/04/send-email-on-raspberry-pi-with-msmtp.html