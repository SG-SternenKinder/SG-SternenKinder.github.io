document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const config = {
        copyrightElementId: 'current-year',
        startYear: 2016
    };

    /**
     * Hauptinitialisierungsfunktion
     */
    function init() {
        setCopyrightYear();
    }

    /**
     * Setzt das Copyright-Jahr
     */
    function setCopyrightYear() {
        const yearElement = document.getElementById(config.copyrightElementId);
        const currentYear = new Date().getFullYear();

        if (yearElement) {
            yearElement.textContent = config.startYear < currentYear
                ? `${config.startYear}-${currentYear}`
                : `${currentYear}`;

            yearElement.setAttribute('data-start-year', config.startYear);
            yearElement.setAttribute('data-current-year', currentYear);
        }
    }

    init();
});