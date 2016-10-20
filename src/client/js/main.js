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

});
