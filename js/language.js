$(function() {
    $('#change-language').on('click', function () {
      $("body").toggleClass("page-language-mode");
      localStorage.setItem('osy-language-mode', $("body").hasClass("page-language-mode"));
    });
    if (localStorage.getItem('osy-language-mode') === 'true') {
      $('#change-language').trigger('click');
    }
});