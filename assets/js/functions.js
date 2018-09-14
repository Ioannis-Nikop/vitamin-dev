$( document ).ready(function() {

  function toggleFollow() {
    // Make sidebar-top responsive
    if ( ( $( "#sidebar" ).width() ) < 250 ) {
      $( "#follow" ).addClass( "hidden" );
    } else {
      $( "#follow" ).removeClass( "hidden" );
    }
  }
  var followInit = toggleFollow();

  // On window Resize
  $( window ).resize(function () {
    var followResize = toggleFollow();
  });

});
