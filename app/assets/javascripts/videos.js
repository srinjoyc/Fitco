
$( document ).ready(function(){
  // Initialize an OpenTok Session object
  var session = TB.initSession(sessionId);

  // Initialize a Publisher, and place it into the element with id="publisher"
  var publisher = TB.initPublisher(apiKey, 'publisher', {width: '100%', height: '100%'});
  // Attach event handlers
  session.on({

    // This function runs when session.connect() asynchronously completes
    sessionConnected: function(event) {
      // Publish the publisher we initialzed earlier (this will trigger 'streamCreated' on other
      // clients)
      session.publish(publisher, {width: '100%', height: '100%'});
    },

    // This function runs when another client publishes a stream (eg. session.publish())
    streamCreated: function(event) {
      // Create a container for a new Subscriber, assign it an id using the streamId, put it inside
      // the element with id="subscribers"
      var subContainer = document.createElement('div');
      subContainer.id = 'stream-' + event.stream.streamId;
      document.getElementById('subscribers').appendChild(subContainer);

      // Subscribe to the stream that caused this event, put it inside the container we just made
      session.subscribe(event.stream, subContainer, {width: '100%', height: '100%'});
    }

  });

  // Connect to the Session using the 'apiKey' of the application and a 'token' for permission
  session.connect(apiKey, token);

  var msgHistory = document.querySelector('#history');
  session.on('signal:msg', function(event) {
    var msg = document.createElement('p');
    msg.innerHTML = event.data;
    msg.className = event.from.connectionId === session.connection.connectionId ? 'mine' : 'theirs';
    msgHistory.appendChild(msg);
    msg.scrollIntoView();
  });


// Text chat
var form = document.querySelector('#chat-entry');
var msgTxt = document.querySelector('#msgTxt');

// Send a signal once the user enters data in the form
form.addEventListener('submit', function(event) {
  event.preventDefault();

  session.signal({
      type: 'msg',
      data: msgTxt.value
    }, function(error) {
      if (!error) {
        msgTxt.value = '';
      }
    });
});


  dragula([left1, right1]);
});


