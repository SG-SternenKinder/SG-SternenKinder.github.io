// scrollback.js

$(document).ready(function () {
    const scrollToTopButton = $('#scroll-to-top');
    const scrollThreshold = 20;
    let lastScrollTop = 0;

    function toggleScrollToTopButton() {
        const scrollTop = $(document).scrollTop();

        if (scrollTop > scrollThreshold && lastScrollTop <= scrollThreshold) {
            $(document.body).addClass('scroll-up');
            $.consoleManager.logToConsoleOnce('Zurückscroll-Pfeil wird angezeigt.', 'scroll-up');
        } else if (scrollTop <= scrollThreshold && lastScrollTop > scrollThreshold) {
            $(document.body).removeClass('scroll-up');
            $.consoleManager.logToConsoleOnce('Zurückscroll-Pfeil wird verborgen.', 'scroll-up');
        }

        lastScrollTop = scrollTop;
    }

    function scrollToTop() {
        $('body').animate({ scrollTop: 0 }, 'slow', function () {
            $(document.body).removeClass('scroll-up');
            $.consoleManager.logToConsoleOnce('Benutzer hat zum oberen Bildschirmrand zurückgescrollt.', 'scroll-top');
        });
    }

    $(window).scroll(toggleScrollToTopButton);
    scrollToTopButton.on('click', scrollToTop);
});
