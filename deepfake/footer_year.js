document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const config = {
        containerSelector: '#footer-container',
        logPrefix: '[Footer]'
    };

    function init() {
        const $container = $(config.containerSelector);
        if (!$container.length) return;
        
        renderFooter($container);
        setCurrentYear();
    }

    function renderFooter($container) {
        const currentYear = new Date().getFullYear();
        const startYear = 2016;
        
        $container.html(`
            <div class="footer-bottom" 
                 data-start-year="${startYear}" 
                 data-current-year="${currentYear}">
            </div>
        `);
        
        if (typeof console !== 'undefined') {
            console.log(`${config.logPrefix} Footer mit Jahresangabe ${startYear}-${currentYear} gerendert`);
        }
    }

    function setCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // Initialisierung nur wenn jQuery verfügbar ist
    if (typeof jQuery !== 'undefined') {
        jQuery(document).ready(init);
    } else {
        // Fallback für wenn jQuery nicht geladen ist
        document.addEventListener('DOMContentLoaded', init);
    }
});