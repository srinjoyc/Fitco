$(function() {
  var handlers = {
    showTrainer: function(trainers){
      console.log("something");
      var table = $('#trainers').find('tbody').empty();
      var fields = ["firstname", "lastname", "gender", "description", "email", "phone", "image"];
      $('#trainerForm').hide();
      $('#search').hide();

      trainers.forEach(function(trainer){
        var tr = $('<tr>').appendTo(table);
        fields.forEach(function(field){
          $('<td>').text(trainer[field]).appendTo(tr);
        });
        $('<td>').html("&times;").css({color: 'red', cursor: 'pointer'}).addClass('delete').data('trainerId', trainer.id).appendTo(tr);
      });
      $('#results').show();
    },
    showSearch: function(){
      $('#trainerForm').hide();
      $('#search').show();
    },
    loadTrainers: function(){

      $.ajax({
        method: 'GET',
        dataType: 'json',
        url: '/trainers',
        success: function(data) {
          handlers.showTrainer(data);
        },
        error: function(){
          alert("error");
          console.log("error");
        }
      });

    },
    addTrainers: function(){
      console.log("add");
      $('#results').hide();
      $('#search').hide();
      $('#trainerForm').show();
    },
    newTrainer: function(event){
      event.preventDefault();
      var firstname = $('#firstname').val();
      var lastname = $('#lastname').val();
      var gender = $('#gender').val();
      var description = $('#description').val();
      var email = $('#email').val();
      var phone = $('#phone').val();
      

      if (firstname == '' || lastname == '' || gender == '' || description == '' || phone == '' || email == ''){
        alert("Please fill in all fields");
        return false;
      } else {
        $.ajaxSetup({
          beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
          }
        });
        $.post('/trainers', {firstname: firstname, lastname: lastname, gender: gender, description: description, email: email, phone: phone}, handlers.postTrainer, 'json');
      }
    },
    postTrainer: function(data){
      if (data.success){
        alert("Trainer successfully added");
        $('#newTrainer')[0].reset();
      } else {
        alert("Trainer is not added");
      }
    },
    searchTrainer: function(event){
      if (event.keyCode == 13 ){
        var search = $('#search').val();

        if (search == ''){
          return false;
        }

        $.ajax({
        method: 'GET',
        dataType: 'json',
        url: '/trainers/search/'+ search ,
          success: function(data) {
            if (data.length) {
              handlers.showTrainer(data);
            } else {
              alert("No trainer with name " + data);
            }
          },
          error: function(){
            alert("error");
            console.log("error");
          }
        });
      }
    }
  };

  $('#loadTrainer').on('click', handlers.loadTrainers);

  $('#addTrainer').on('click', handlers.addTrainers);

  $('#newTrainer').on('submit', handlers.newTrainer);

  $('#loadSearch').on('click', handlers.showSearch);

  $('#search').on('keyup', handlers.searchTrainer);
 
});

// jQuery to collapse the navbar on scroll
function collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
  if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
    $('.navbar-toggle:visible').click();
  }
});

// Google Maps Scripts
var map = null;
// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);
google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenter(new google.maps.LatLng(40.6700, -73.9400));
});

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 15,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(40.6700, -73.9400), // New York

        // Disables the default Google Maps UI components
        disableDefaultUI: true,
        scrollwheel: false,
        draggable: false,

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 29
            }, {
                "weight": 0.2
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 18
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 16
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 21
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#000000"
            }, {
                "lightness": 16
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "saturation": 36
            }, {
                "color": "#000000"
            }, {
                "lightness": 40
            }]
        }, {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 19
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }, {
                "weight": 1.2
            }]
        }]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    map = new google.maps.Map(mapElement, mapOptions);

    // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
    var image = 'img/map-marker.png';
    var myLatLng = new google.maps.LatLng(40.6700, -73.9400);
    var beachMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image
    });
}