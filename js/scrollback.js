/**
 * Scrollback-Komponente für "Nach oben"-Button
 * @namespace scrollback
 */
(function($) {
    'use strict';

    // Konfiguration
    const config = {
        scrollThreshold: 20,
        animationDuration: 600,
        buttonSelector: '#scroll-to-top',
        scrollClass: 'scroll-up',
        logPrefix: '[Scrollback]'
    };

    // Zustand
    let state = {
        lastScrollTop: 0,
        isScrolling: false
    };

    // DOM-Elemente
    const $elements = {
        body: $('body'),
        window: $(window),
        htmlAndBody: $('html, body'),
        button: $(config.buttonSelector)
    };

    /**
     * Zeigt oder versteckt den Scroll-Button basierend auf der Scroll-Position
     */
    function handleScroll() {
        const scrollTop = $elements.window.scrollTop();
        const shouldShow = scrollTop > config.scrollThreshold;
        const wasShown = state.lastScrollTop > config.scrollThreshold;

        // Nur Änderungen behandeln
        if (shouldShow !== wasShown) {
            $elements.body.toggleClass(config.scrollClass, shouldShow);
            
            const message = shouldShow 
                ? 'Zurückscroll-Pfeil wird angezeigt.' 
                : 'Zurückscroll-Pfeil wird verborgen.';
            $.consoleManager.logOnce(config.logPrefix + ' ' + message, 'scroll-visibility');
        }

        state.lastScrollTop = scrollTop;
    }

    /**
     * Scrollt sanft zum Seitenanfang
     */
    function scrollToTop() {
        if (state.isScrolling) return;
        
        state.isScrolling = true;
        
        $elements.htmlAndBody.stop().animate(
            { scrollTop: 0 }, 
            config.animationDuration,
            'swing',
            function() {
                $elements.body.removeClass(config.scrollClass);
                state.isScrolling = false;
                $.consoleManager.logOnce(
                    config.logPrefix + ' Benutzer hat zum oberen Bildschirmrand zurückgescrollt.', 
                    'scroll-action'
                );
            }
        );
    }

    /**
     * Initialisiert die Scrollback-Komponente
     */
    function init() {
        // Event-Handler
        $elements.window.on('scroll', handleScroll);
        $elements.button.on('click', scrollToTop);
        
        // Initialen Zustand prüfen
        handleScroll();
    }

    // Initialisierung nach DOM ready
    $(document).ready(init);

})(jQuery);