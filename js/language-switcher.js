// language-switcher.js
$(document).ready(async function () {
    const languageSlider = $('#language-slider');
    let currentLanguage = $.CookieUtil.getCookie('language') || 'de';

    /**
     * Setzt den Zustand des Sliders basierend auf der aktuellen Sprache.
     * @param {string} language - Die aktuelle Sprache.
     */
    function setSliderState(language) {
        languageSlider.prop('checked', language === 'en');
        logToConsole(`Slider state set to ${language}`);
    }

    // Wenn es ein gespeichertes Sprach-Cookie gibt, stelle den Schieberegler entsprechend ein
    setSliderState(currentLanguage);

    /**
     * Lädt die Texte aus der Datei basierend auf der ausgewählten Sprache.
     * @param {string} language - Die ausgewählte Sprache.
     */
    async function loadTexts(language) {
        try {
            // Überprüfe, ob eine Internetverbindung besteht
            const isOnline = navigator.onLine;

            if (!isOnline) {
                // Keine Internetverbindung, zeige den Sprachcode anstelle der Flaggen
                const offlineText = language.toUpperCase(); // Zeige den Sprachcode (EN oder DE)

                const languageElement = $('#language');
                if (languageElement.length) {
                    languageElement.html(offlineText);
                }

                const flagsElement = $('#flags');
                if (flagsElement.length) {
                    flagsElement.hide();
                }

                logToConsole(`No internet connection. Displaying language code: ${offlineText}`);
                return; // Beende die Funktion, wenn keine Internetverbindung besteht
            }

            logToConsole(`Loading texts for language: ${language}`);

            const response = await fetchTexts(language);
            const texts = await response.text();

            // Verwende jQuery, um Elemente zu selektieren und den Text zu setzen
            $.each(texts.split('\n'), function (index, text) {
                const [key, value] = text.split('=');
                if (key && value) {
                    const element = $('#' + key);
                    if (element.length) {
                        element.html(value);
                    }
                }
            });

            logToConsole(`Texts loaded successfully for language: ${language}`);
        } catch (error) {
            console.error('Fehler beim Laden der Texte:', error);
        }
    }

    /**
     * Ruft die Texte für eine bestimmte Sprache ab.
     * @param {string} language - Die Sprache, für die die Texte abgerufen werden sollen.
     * @returns {Promise<Response>} - Die Fetch-Response.
     */
    async function fetchTexts(language) {
        try {
            logToConsole(`Fetching texts for language: ${language}`);
            const response = await fetch(`/language/language-${language}.txt`);

            if (!response.ok) {
                throw new Error(`Failed to fetch language file for ${language}`);
            }

            return response;
        } catch (error) {
            throw new Error(`Error fetching language file: ${error.message}`);
        }
    }

    /**
     * Aktualisiert das Sprach-Cookie.
     * @param {string} language - Die Sprache, die gespeichert werden soll.
     */
    function updateLanguageCookie(language) {
        $.CookieUtil.setCookie('language', language, 4, { secure: true }); // Speichere die Sprache für 4 Tage
        logToConsole(`Language cookie updated: ${language}`);
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

    // Überwache Änderungen am Schieberegler und speichere die Sprache als Cookie
    languageSlider.on('change', function () {
        currentLanguage = languageSlider.prop('checked') ? 'en' : 'de';

        // Aktualisiere den Text der Elemente basierend auf der ausgewählten Sprache
        loadTexts(currentLanguage);

        // Speichere die ausgewählte Sprache im Cookie
        updateLanguageCookie(currentLanguage);
    });
});
