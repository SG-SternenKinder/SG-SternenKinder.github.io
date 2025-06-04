/**
 * Footer-Komponente
 * @namespace footer
 */
(function($) {
    'use strict';

    // Konfiguration
    const config = {
        containerSelector: '#footer-container',
        copyrightText: 'Spiele-Gemeinschaft (SG) SternenKinder',
        logPrefix: '[Footer]'
    };

    /**
     * Initialisiert die Footer-Komponente
     */
    function init() {
        const $footerContainer = $(config.containerSelector);

        if (!$footerContainer.length) {
            logError('Footer-Container wurde nicht gefunden');
            return;
        }

        renderFooter($footerContainer);
        log('Footer erfolgreich erstellt');
    }

    /**
     * Erstellt und rendert den Footer
     * @param {jQuery} $container - Container-Element
     */
    function renderFooter($container) {
        const currentYear = new Date().getFullYear();
        const startYear = 2016;
        
        const footerHtml = `
            <footer>
                <div class="footer-bottom">
                    &copy; ${startYear} - ${currentYear} | ${config.copyrightText} | Alle Rechte vorbehalten
                </div>
            </footer>
        `;

        $container.html(footerHtml);
    }

    /**
     * Loggt eine Nachricht in die Konsole
     * @param {string} message - Nachricht
     */
    function log(message) {
        if (typeof $.consoleManager !== 'undefined' && $.consoleManager.getConsoleOutput()) {
            console.log(`${config.logPrefix} ${message}`);
        }
    }

    /**
     * Loggt einen Fehler in die Konsole
     * @param {string} error - Fehlermeldung
     */
    function logError(error) {
        if (typeof $.consoleManager !== 'undefined') {
            $.consoleManager.error(`${config.logPrefix} ${error}`);
        } else {
            console.error(`${config.logPrefix} ${error}`);
        }
    }

    // Initialisierung nach DOM ready
    $(document).ready(init);

})(jQuery);