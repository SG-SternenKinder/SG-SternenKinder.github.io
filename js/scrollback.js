// scrollback.js

$(document).ready(function () {
    const scrollToTopButton = $('#scroll-to-top');
    const scrollThreshold = 20;

    /**
     * Zeigt oder versteckt den Scroll-to-Top-Button basierend auf der Scroll-Position.
     */
    function toggleScrollToTopButton() {
        const scrollTop = $(document).scrollTop();

        if (scrollTop > scrollThreshold) {
            $(document.body).addClass('scroll-up');
            logToConsole('Zurückscroll-Pfeil wird angezeigt.');
        } else {
            $(document.body).removeClass('scroll-up');
            logToConsole('Zurückscroll-Pfeil wird verborgen.');
        }
    }

    /**
     * Scrollt die Seite mit einer Animation nach oben.
     */
    function scrollToTop() {
        $('body,html').animate({ scrollTop: 0 }, 'slow', function () {
            $(document.body).removeClass('scroll-up');
            logToConsole('Benutzer hat zum oberen Bildschirmrand zurückgescrollt.');
        });
    }

    /**
     * Loggt Nachrichten in die Konsole, falls der consoleManager aktiviert ist.
     * @param {string} message - Die zu loggende Nachricht.
     */
    function logToConsole(message) {
        if (typeof $.consoleManager !== 'undefined' && $.consoleManager.getConsoleOutput()) {
            console.log(message);
        }
    }

    // Scroll-Event-Listener hinzufügen, um die Sichtbarkeit des Buttons zu steuern
    $(window).scroll(toggleScrollToTopButton);

    // Click-Event-Listener zum Scroll-to-Top-Button hinzufügen
    scrollToTopButton.on('click', scrollToTop);
});
