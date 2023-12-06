// scrollback.js
$(document).ready(function () {
    const scrollToTopButton = $('#scroll-to-top');

    // Zeige oder verberge den Zurückscroll-Pfeil basierend auf der Bildschirmposition
    $(window).scroll(function () {
        if ($(document.body).scrollTop() > 20 || $(document.documentElement).scrollTop() > 20) {
            $(document.body).addClass('scroll-up');
            if ($.consoleManager.getConsoleOutput()) {
                console.log('Zurückscroll-Pfeil wird angezeigt.');
            }
        } else {
            $(document.body).removeClass('scroll-up');
            if ($.consoleManager.getConsoleOutput()) {
                console.log('Zurückscroll-Pfeil wird verborgen.');
            }
        }
    });

    // Füge einen Event Listener für das Zurückscrollen hinzu
    scrollToTopButton.on('click', function () {
        $('body,html').animate({ scrollTop: 0 }, 'slow'); // Animiere das Zurückscrollen
        $(document.body).removeClass('scroll-up'); // Entferne die Klasse beim Zurückscrollen
        if ($.consoleManager.getConsoleOutput()) {
            console.log('Benutzer hat zum oberen Bildschirmrand zurückgescrollt.');
        }
    });
});