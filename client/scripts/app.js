// YOUR CODE HERE:
var app = {

  init: function () {
    $('#send .submit').submit(app.handleSubmit);
  },

  send: function (message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  
  fetch: function () {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      type: 'GET',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  
  clearMessages: function () {
    $('#chats').children().remove();
  },

  renderMessage: function (message) {
    //we need to figure out way to display message in the DOM
    var messageDOM = $('<div id="message">' + message.text + '</div>');
    var userNameDOM = $('<a src="#" class="username">' + message.username + '</a>');
    userNameDOM.on('click', app.handleUsernameClick);
    var submitButton = $('<button type="submit" id="send" class="submit">Submit</button>');
    submitButton.submit(app.handleSubmit);
    var $message = $('<div></div>');
    $message.append(messageDOM, userNameDOM, submitButton);

    $('#chats').append($message);
  },

  renderRoom: function (room) {
    //we need to figure out way to display message in the DOM
    var roomDOM = $('<div class="rooms">' + room + '</div>');
    $('#roomSelect').append(roomDOM);
  },
  
  handleUsernameClick: function (event) {
    //add username to friend list
  },

  handleSubmit: function () {
    console.log('test');
  }
  
};
