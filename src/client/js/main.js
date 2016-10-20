$(document).ready(function() {

  $('.dropdown-button').dropdown({
    hover: false
  });

  $('.back').click(function() {
    window.history.back();
  });

  // Initialize collapse button
  $('.button-collapse').sideNav();
  // Sidebar collapsible menu
  $('.collapsible').collapsible();
  //Search city selector
  $('select').material_select();


  var url;

  //validate user input, prevent empty values
  $('.textField').on('input', function () {
    $(this).addClass('invalid');
    var name = $(this).val();
    if (name) {
      $(this).removeClass('invalid');
    }
    else {
      $(this).addClass('invalid');
    }
  });

  //don't allow the form to submit if the values are invalid

  $('.textField').on('input', function() {

    var fieldValues = [$('#planName').val(), $('#planLocation').val(), $('#planDate').val(),];

    var validValues = fieldValues.filter(function(value) {
      return !!value;
    });

    if (fieldValues.length === validValues.length) {
      $('.submit').removeClass('hidden-submit');
    } else {
      $('.submit').addClass('hidden-submit');
    }
  });

  $('#postPlanAndSearchPlace').submit(function () {

    var pathname = window.location.pathname;
    var hostname = window.location.hostname;

    //toggle including port No. on deployment
    if(hostname === 'localhost' || hostname === '127.0.0.1') {
      url = 'http://'+hostname+':3000'+pathname;
    } else {
      url = 'http://'+hostname+pathname;
    }

    $.ajax({
      type : 'POST',
      url : url,
      data : {
        name : $('#planName').val(),
        city : $('#planLocation').val(),
        date : $('#planDate').val(),
      },
    });

  });

  $('#addPlace').click(function () {

    var hostname = window.location.hostname;
    var planID = $('#planID').val();
    var userID = $('#userID').val();

      //toggle including port No. on dev/deployment
    if(hostname === 'localhost' || hostname === '127.0.0.1') {
      url = 'http://'+hostname+':3000/users/'+userID+'/plans/'+planID+'/places/new';
    } else {
      url = 'http://'+hostname+'/users/'+userID+'/plans/'+planID+'/places/new';
    }

    $.ajax({
      type : 'POST',
      url : url,
      data : {
        plan_id : $('#planID').val(),
        name : $('#name').val(),
        address : $('#address').val(),
        city : $('#city').val(),
        state : $('#state').val(),
        zipcode : $('#zipcode').val(),
        time : $('#time').val(),
      }
    });
  });
});
