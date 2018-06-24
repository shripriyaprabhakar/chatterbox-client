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
      app.clearRoomList();
      app.fetch();
    });
    
    // $('.roomname').on('click', function(e) {
    //   // app.clearRoomList();
    //   debugger;
    //   $('#chats').children().toggle();
    //   app.handleListFilter();
    //   // $('#chats').append('.roomname');
    // });

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
        $('#refreshButton').trigger('click');
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
        // messages = data;
        
        app.clearMessages();
        
        var roomnames = new Set();
        _.each(data.results, function(dataObject) {
          app.renderMessage(dataObject);
          roomnames.add(app.escapeSequence(dataObject.roomname));
        });
       
        var $showAll = $('<option>Show All</option>');
        $('.roomSelect').append($showAll);
        
        for (let roomname of roomnames) {
          var $roomname = $('<option>' + roomname + '</option>');
          $('.roomSelect').append($roomname);
        }
        
        app.boldAllFriends();
      },

      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  
  refresh: function () {
    
  },
  
  clearMessages: function () {
    $('#chats').children().remove();
  },

  renderMessage: function (message) {
    
    //we need to figure out way to display message in the DOM
    var $text = $('<div class="text">' + app.escapeSequence(message.text) + '</div>');
    var $username = $('<a src="#" class="username">' + app.escapeSequence(message.username) + '</a>');
    var $roomname = $('<div class="roomname">' + app.escapeSequence(message.roomname) + '</div>');
    
    // app.roomName.add(app.escapeSequence(message.roomname)); 

    var $break = $('<br>');
    
    $username.on('click', app.handleUsernameClick);

    var $message = $('<div class="postedMessage"></div>');

    $message.append($text, $username, $roomname, $break);
  

    $('#chats').append($message);
    
  },
  
  clearRoomList: function () {
    $('.roomSelect').children().remove();    
  },

  renderRoom: function (room) {
    //we need to figure out way to display message in the DOM
    var $room = $('<option>' + room + '</option>');
    $('#roomSelect').append($room);
  },
  
  handleUsernameClick: function (event) {
    //add username to friend list
    let friendName = this.text;

    app.boldFriendName(friendName);
    
    app.friends.name.add(friendName);
    let friendArray = [...app.friends.name];
    let friendText = friendArray.join(', ');
    
    $('.friendNames')[0].textContent = friendText;
  },
  
  boldFriendName: function (friendName) {
    let $listOfFriends = $('.postedMessage').children('.username');
    
    $listOfFriends = $listOfFriends.filter(function() {
      return this.text === friendName;
    });
    
    $listOfFriends.addClass('friend');
  },
  
  boldAllFriends: function () {

    for (let friendName of app.friends.name) {
      app.boldFriendName(friendName);
    }
  },

  handleSubmit: function () {
    var message = {
      username: /username=(.*)/.exec(window.location.search)[1],
      text: $('.messageBox')[0].value,
      roomname: 'This is a Specific Room Name'
    };
    app.send(message);
    console.log('submitted');
  },
  
  handleListFilter: function () {
    let selectedRoomName = $('.roomSelect').find('option:selected').text();
    debugger;
    if (selectedRoomName === "Show All") {
      $('.postedMessage').toggle(true);      
    } else {
      $('.postedMessage').toggle(false);
      // if ($('.roomSelect').find('option:selected').text() === "Show All") {
      //   $('#chats').children().toggle();      
      // } else {

      var $filerteredRoomNames = $('.roomname').filter(function (index) {
        return $('.roomSelect').find('option:selected').text() === this.textContent;
      });

      $filerteredRoomNames.closest('.postedMessage').toggle(true);      
    }

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
  },
  
  updateRoomDropdownList: function () {
    // clear roomname set   
    // clear select class.children()
    // for each element in the roomname set,
      // add a option tag and add that room name to the tag
      // add new element to the select class

    // debugger;
    _.each(app.roomName, function(roomname) {
      app.renderRoom(roomname);
    });
  },
  
  friends: {
    name: new Set()
  }

};
