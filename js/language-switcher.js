// language-switcher.js
document.addEventListener('DOMContentLoaded', function () {
    const languageSlider = document.getElementById('language-slider');
    const selectedLanguage = getCookie('language') || 'de';

    // Wenn es ein gespeichertes Sprach-Cookie gibt, stelle den Schieberegler entsprechend ein
    if (selectedLanguage === 'en') {
        languageSlider.checked = true;
    }

    // Konsolenausgabe für Debugging
    console.log('DOMContentLoaded event fired');

    // Funktion zum Laden von Texten aus der Datei
    async function loadTexts(language) {
        try {
            // Konsolenausgabe für Debugging
            console.log('Loading texts for language:', language);

            const response = await fetchTexts(language);
            const texts = await response.text();

            texts.split('\n').forEach(function (text) {
                const [key, value] = text.split('=');
                if (key && value) {
                    const element = document.getElementById(key);
                    if (element) {
                        element.innerHTML = value;
                    }
                }
            });
        } catch (error) {
            console.error('Fehler beim Laden der Texte:', error);
        }
    }

    // Funktion zum Fetchen der Texte
    async function fetchTexts(language) {
        try {
            // Konsolenausgabe für Debugging
            console.log('Fetching texts for language:', language);

            const response = await fetch(`language/language-${language}.txt`);
            if (!response.ok) {
                throw new Error(`Failed to fetch language file for ${language}`);
            }
            return response;
        } catch (error) {
            throw new Error(`Error fetching language file: ${error.message}`);
        }
    }

    function updateLanguageCookie(language) {
        setCookie('language', language, 4); // Speichere die Sprache für 4 Tage
    }

    // Überwache Änderungen am Schieberegler und speichere die Sprache als Cookie
    languageSlider.addEventListener('change', function () {
        const selectedLanguage = languageSlider.checked ? 'en' : 'de';

        // Initialisiere den Text basierend auf dem gespeicherten Cookie
        setSliderState(selectedLanguage);

        // Aktualisiere den Text der Elemente basierend auf der ausgewählten Sprache
        loadTexts(selectedLanguage);

        // Speichere die ausgewählte Sprache im Cookie
        updateLanguageCookie(selectedLanguage);
    });

});