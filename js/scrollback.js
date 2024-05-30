// scrollback.js

$(document).ready(function () {
    const scrollToTopButton = $('#scroll-to-top');
    const scrollThreshold = 20;

    /**
     * Show or hide the scroll-to-top button based on the scroll position.
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
     * Scroll the page to the top with an animation.
     */
    function scrollToTop() {
        $('body,html').animate({ scrollTop: 0 }, 'slow', function() {
            $(document.body).removeClass('scroll-up');
            logToConsole('Benutzer hat zum oberen Bildschirmrand zurückgescrollt.');
        });
    }

    /**
     * Log messages to the console if the consoleManager is enabled.
     * @param {string} message - The message to log.
     */
    function logToConsole(message) {
        if ($.consoleManager && $.consoleManager.getConsoleOutput()) {
            console.log(message);
        }
    }

    // Add scroll event listener to toggle the button visibility
    $(window).scroll(toggleScrollToTopButton);

    // Add click event listener to the scroll-to-top button
    scrollToTopButton.on('click', scrollToTop);
});
