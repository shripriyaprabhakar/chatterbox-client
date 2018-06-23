// YOUR CODE HERE:
var app = {

  init: function () {
    // app.send();
    app.fetch();

    $('#messageForm').submit(function (e) {
      e.preventDefault();
      app.handleSubmit();
    });

    $('#refreshButton').on('click', function(e) {
      app.clearMessages();
      app.fetch();
    });

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
        app.fetch();
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
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      // data: JSON.stringify(message),
      contentType: 'application/json',
      data: {'order': '-createdAt'},
      success: function (data) {
        $('#chats').children().remove();
        _.each(data.results, function(dataObject) {
          app.renderMessage(dataObject);
        });
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
    var messageDOM = $('<p id="message">' + app.escapeSequence(message.text) + '</p>');
    var userNameDOM = $('<a src="#" class="username">' + app.escapeSequence(message.username) + '</a>');
    
    userNameDOM.on('click', app.handleUsernameClick);
    // var $submitForm = $('<form class="postMessage"><button type="submit">Submit</button></form>');

    var $message = $('<div class="postedMessage"></div>');
    $message.append(messageDOM, userNameDOM);

    $('#chats').append($message);
    // $submitForm.submit(function (e) {
    //   e.preventDefault();
    //   app.handleSubmit();
    // });

  },

  renderRoom: function (room) {
    //we need to figure out way to display message in the DOM
    var roomDOM = $('<div class="rooms">' + room + '</div>');
    $('#roomSelect').append(roomDOM);
  },
  
  handleUsernameClick: function (event) {
    //add username to friend list
    console.log('hello!');
  },

  handleSubmit: function () {
    var message = {
      username: /username=(.*)/.exec(window.location.search)[1],
      text: $('.messageBox')[0].value,
      roomname: 'Room 136a'
    };
    app.send(message);
  },

  escapeCharacters: {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  },

  escapeSequence: function (string) {
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
      return app.escapeCharacters[s];
    });
  }
  
};
