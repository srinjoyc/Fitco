
$(function() {

var handlers = {
  showWorkout: function(){
    console.log("werkwerk");

    $.ajax({
      method: 'GET',
      dataType: 'HTML',
      url: '/exercises',
      success: function(data){
        event.preventDefault()
        console.log("success");
        $(data).insertAfter("#workouts");
        // handlers.showWorkout(data);
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
      url: '/v',
      success: function(data){
        // handlers.editUser(data);
      },
      error: function(){
        alert("AArrrghhh");
        console.log("aargh")
      }
    })
  },
  // showUser: function(){
  //   console.log();

  //   $.ajax({
  //     method:'GET',
  //     data:'html/text',
  //     url: '',
  //     success: function(user){
  //       event.preventDefault();
  //       // handlers.showUser(user); 
  //       $('#userprofile').append(user);
  //       console.log(user)
  //     },
  //     error: function(){
  //       alert("error");
  //       console.log("cmonnn")
  //     }
  //   });
  // },
};
  $('#trainerinterface').on('click', handlers.editUser);
  // $('#userprofile').on('click', handlers.showUser)
  $('#workouts').on('click', handlers.showWorkout);
});