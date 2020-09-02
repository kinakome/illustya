$(function () {
    setInterval(function() {
      $('.line').fadeOut('slow', function() {
        $(this).fadeIn('slow');
      });
    }, 4000);
});
