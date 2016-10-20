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

});
