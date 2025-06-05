document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Konfiguration
    const config = {
        copyrightElementId: 'current-year',
        companyName: 'Discord, Inc.',
        startYear: 2016,
        logPrefix: '[Footer]'
    };

    /**
     * Hauptinitialisierungsfunktion
     */
    function init() {
        try {
            setCopyrightYear();
            log('Copyright-Jahr erfolgreich gesetzt');
        } catch (error) {
            logError(error.message);
        }
    }

    /**
     * Setzt das Copyright-Jahr
     */
    function setCopyrightYear() {
        const yearElement = document.getElementById(config.copyrightElementId);
        const currentYear = new Date().getFullYear();
        
        if (yearElement) {
            // Format: "2023" oder "2016-2023" wenn startYear < currentYear
            yearElement.textContent = config.startYear < currentYear 
                ? `${config.startYear}-${currentYear}`
                : `${currentYear}`;
            
            // Setze zusätzliche Datenattribute
            yearElement.setAttribute('data-start-year', config.startYear);
            yearElement.setAttribute('data-current-year', currentYear);
        } else {
            throw new Error('Copyright-Element nicht gefunden');
        }
    }

    /**
     * Loggt Nachrichten in die Konsole
     */
    function log(message) {
        if (typeof console !== 'undefined') {
            console.log(`${config.logPrefix} ${message}`);
        }
    }

    /**
     * Loggt Fehler in die Konsole
     */
    function logError(error) {
        if (typeof console !== 'undefined') {
            console.error(`${config.logPrefix} ${error}`);
        }
    }

    // Initialisierung starten
    init();
});