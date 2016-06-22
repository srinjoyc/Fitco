$(function() {
  var handlers = {

  showWorkout: function(){
    console.log("werkwerk");

    $.ajax({
      method: 'GET',
      dataType: 'json',
      url: 'workout/index',
      success: function(data){
        handlers.showWorkout(data);
      },
      error: function(){
        alert("error");
        console.log("error")
      }
    })
  },
  editUser: function(user){
    console.log("hey");

    $.ajax({
      method: 'GET',
      datatype: 'form',
      url: '/users/new',
      success: function(data){
        // handlers.editUser(data);
      },
      error: function(){
        alert("AArrrghhh");
        console.log("aargh")
      }
    })
  },
  showUser: function(){
    console.log();

    $.ajax({
      method:'GET',
      data:'html/text',
      url: '/users/new',
      success: function(user){
        event.preventDefault();
        // handlers.showUser(user); 
        $('#userprofile').append(user);
        console.log(user)
      },
      error: function(){
        alert("error");
        console.log("cmonnn")
      }
    });
  },
  postForm: function(users){

  }
};
  // postForm: function(users){
  //   console.log('posting form');
  //   var table = $("#users").find('tbody').empty();


  //   $.ajax({
  //     method: 'POST',
  //     datatype: 'json',
  //     url:'/new'
  //     success: function(user){
  //       handlers.postForm();
  //       $('#submit').append()
  //     }
  //   })
  // }

  $('#trainerinterface').on('click', handlers.editUser)
  $('#userprofile').on('click', handlers.showUser)
  $('#workouts').on('click', handlers.showWorkout)
});