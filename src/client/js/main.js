$(function() {

  $('.dropdown-button').dropdown({
    hover: false
  });


  // Initialize collapse button
  $('.button-collapse').sideNav();
  // Sidebar collapsible menu
  $('.collapsible').collapsible();
  //Search city selector
  $('select').material_select();


  var url;

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
        name : $('#name').val(),
        city : $('#location').val(),
        date : $('#date').val(),
      },
    });

  });

  $('#addPlace').submit(function () {

    var hostname = window.location.hostname;
    var planID = $('#planID').val();
    var userID = $('#userID').val();

      //toggle including port No. on dev/deployment
    if(hostname === 'localhost' || hostname === '127.0.0.1') {
      url = 'http://'+hostname+':3000/users/'+userID+'/plans/'+planID+'/new';
    } else {
      url = 'http://'+hostname+'/users/'+userID+'/plans/'+planID+'/new';
    }

    $.ajax({
      type : 'POST',
      url : url,
      data : {
        name : $('#name'),
        address : $('#address'),
        city : $('#city'),
        state : $('#state'),
        zipcode : $('#zipcode'),
        time : $('#time'),
      }
    });
  });

});
