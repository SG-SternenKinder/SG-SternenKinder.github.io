// scrollback.js

$(document).ready(function () {
    const scrollToTopButton = $('#scroll-to-top');
    const scrollThreshold = 20;
    let lastScrollTop = 0;

    /*
     * Zeigt oder versteckt den Scroll-to-Top-Button basierend auf der Scroll-Position.
     */
    function toggleScrollToTopButton() {
        const scrollTop = $(document).scrollTop();

        if (scrollTop > scrollThreshold && lastScrollTop <= scrollThreshold) {
            $(document.body).addClass('scroll-up');
            $.consoleManager.logToConsoleOnce('Zurückscroll-Pfeil wird angezeigt.');
        } else if (scrollTop <= scrollThreshold && lastScrollTop > scrollThreshold) {
            $(document.body).removeClass('scroll-up');
            $.consoleManager.logToConsoleOnce('Zurückscroll-Pfeil wird verborgen.');
        }

        lastScrollTop = scrollTop;
    }

    function scrollToTop() {
        $('body,html').animate({ scrollTop: 0 }, 'slow', function () {
            $(document.body).removeClass('scroll-up');
            $.consoleManager.logToConsoleOnce('Benutzer hat zum oberen Bildschirmrand zurückgescrollt.');
        });
    }

    $(window).scroll(toggleScrollToTopButton);
    scrollToTopButton.on('click', scrollToTop);
});
