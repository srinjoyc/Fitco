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
        $.post('/trainers', {firstname: firstname, lastname: lastname, gender: gender, description: description, email: email, phone: phone}, handlers.postTrainer, 'json');
      }
    },
    postTrainer: function(results){
      if (results.result){
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
    },
    deleteTrainer: function(){
      var row = $(this).parents('tr');
      var id = $(this).data('trainerId');
      $.getJSON('/trainers/'+id+'/delete', function(result){
        if (result.result) {
          alert("Trainer deleted");
          row.remove();
        } else {
          alert("Not deleted");
        }
      });
    }
  };

  $('#loadTrainer').on('click', handlers.loadTrainers);

  $('#addTrainer').on('click', handlers.addTrainers);

  $('#newTrainer').on('submit', handlers.newTrainer);

  $('#loadSearch').on('click', handlers.showSearch);

  $('#search').on('keyup', handlers.searchTrainer);

  $('#trainers').on('click', '.delete', handlers.deleteTrainer);
 
});
