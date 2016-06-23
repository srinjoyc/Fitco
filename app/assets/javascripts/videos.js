
$( document ).ready(function(){
  // Initialize an OpenTok Session object
  var session = OT.initSession(sessionId);
  var drake = dragula();
  var resize_counter = 0;
  var subscriber;

  // Initialize a Publisher, and place it into the element with id="publisher"
  var publisher = OT.initPublisher(apiKey, 'small-video', {width: '100%', height: '100%'});
  // Attach event handlers
  $("#resize").click( function resizePublisher(){
      resize_counter += 1;
      if(resize_counter%2 != 0){
        publisher.element.style.width = "1000px";
        publisher.element.style.height = "750px";
        subscriber.element.style.width = "1000px";
        subscriber.element.style.height = "750px";
      } else {
        publisher.element.style.width = "100%";
        publisher.element.style.height = "400px";
        subscriber.element.style.width = "100%";
        subscriber.element.style.height ="750px";
      }
    });

  $("#add-exercise").click(function (e) {
      var name = $("#ex-name").val();
      var metric = $("#ex-metric").val();
      var description = $("#ex-description").val();
      e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/exercises',
        dataType : 'json',
        data: {
            name: name, //TODO replace user and appointment 
            metric: metric,
            description: description, 
            user_id: 1,
            appointment_id: 1
        },
        success: function(json)
        {
          alert(json)
        },
        error: function(json) {
          alert("ajax error")
        }
    });
  });

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
      document.getElementById('large-video').appendChild(subContainer);

      // Subscribe to the stream that caused this event, put it inside the container we just made
      subscriber = session.subscribe(event.stream, subContainer, {width: '100%', height: '100%'});
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
var cards = document.querySelector('#cards');
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
});


