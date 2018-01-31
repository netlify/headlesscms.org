$(function() {
  var share = new Share("#share-button-top", {
    networks: {
      facebook: {
        app_id: "1604147083144211",
      }
    }
  });

  // This is still buggy and just a band-aid
  $(window).on('resize', function(){
    $('.navbar').attr('style', '').removeData('pin');
    $('.navbar').pin({
      minWidth: 500
    });
  });

  $('.landing .card').matchHeight();
});
