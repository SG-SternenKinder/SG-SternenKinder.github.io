// language-switcher.js
$(document).ready(async function () {
    const languageSlider = $('#language-slider');
    let currentLanguage = $.CookieUtil.getCookie('language') || 'de';

    // Funktion zum Setzen des Slider-Zustands
    function setSliderState(language) {
        languageSlider.prop('checked', language === 'en');
        if ($.consoleManager.getConsoleOutput()) {
            console.log(`Slider state set to ${language}`);
        }
    }

    // Wenn es ein gespeichertes Sprach-Cookie gibt, stelle den Schieberegler entsprechend ein
    setSliderState(currentLanguage);

    // Funktion zum Laden von Texten aus der Datei basierend auf der ausgewählten Sprache
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

                // Verstecke die Flaggen
                const flagsElement = $('#flags');
                if (flagsElement.length) {
                    flagsElement.hide();
                }

                if ($.consoleManager.getConsoleOutput()) {
                    console.log(`No internet connection. Displaying language code: ${offlineText}`);
                }

                return; // Beende die Funktion, wenn keine Internetverbindung besteht
            }

            // Wenn eine Internetverbindung besteht, lade die Texte normal
            if ($.consoleManager.getConsoleOutput()) {
                console.log('Loading texts for language:', language);
            }

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

            if ($.consoleManager.getConsoleOutput()) {
                console.log(`Texts loaded successfully for language: ${language}`);
            }

            // Setze den Text für den Slider
            //setSliderText(language);
        } catch (error) {
            console.error('Fehler beim Laden der Texte:', error);
        }
    }

    // Funktion zum Fetchen der Texte für eine bestimmte Sprache
    async function fetchTexts(language) {
        try {
            // Konsolenausgabe für Debugging
            if ($.consoleManager.getConsoleOutput()) {
                console.log('Fetching texts for language:', language);
            }

            const response = await fetch(`/language/language-${language}.txt`);

            if (!response.ok) {
                throw new Error(`Failed to fetch language file for ${language}`);
            }

            return response;
        } catch (error) {
            throw new Error(`Error fetching language file: ${error.message}`);
        }
    }

    // Funktion zum Aktualisieren des Sprach-Cookies
    function updateLanguageCookie(language) {
        $.CookieUtil.setCookie('language', language, 4, { secure: true }); // Speichere die Sprache für 4 Tage
        if ($.consoleManager.getConsoleOutput()) {
            console.log(`Language cookie updated: ${language}`);
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