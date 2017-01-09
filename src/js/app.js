// ES6 code goes here

$('.card .description').each(function() {
  if ($(this).height() > 66) {
    $(this).addClass('too-long');
  }
});