// language-switcher.js
document.addEventListener('DOMContentLoaded', function () {
    const languageSlider = document.getElementById('language-slider');

    // Funktion zum Laden von Texten aus der Datei
    async function loadTexts(language) {
        try {
            const response = await fetchTexts(language);
            const texts = await response.text();

            texts.split('\n').forEach(function (text) {
                const [key, value] = text.split('=');
                if (key && value) {
                    const element = document.getElementById(key);
                    if (element) {
                        element.textContent = value;
                    }
                }
            });
        } catch (error) {
            console.error('Fehler beim Laden der Texte:', error);
        }
    }

    async function fetchTexts(language) {
        // Hier den Pfad zur zentralen Textdatei einfügen
        const response = await fetch(`../language/language-${language}.txt`);
        return response;
    }

    function updateLanguageCookie(language) {
        setCookie('language', language, 4); // Speichere die Sprache für 4 Tage
    }

    function setSliderState(language) {
        languageSlider.checked = language === 'en';
    }

    // Initialisiere den Text basierend auf dem gespeicherten Cookie
    const savedLanguage = getCookie('language') || 'de';
    setSliderState(savedLanguage);

    // Lade die Texte basierend auf der gespeicherten Sprache
    loadTexts(savedLanguage);

    // Überwache Änderungen am Schieberegler und speichere die Sprache als Cookie
    languageSlider.addEventListener('change', function () {
        const selectedLanguage = languageSlider.checked ? 'en' : 'de';

        // Aktualisiere den Text der Elemente basierend auf der ausgewählten Sprache
        loadTexts(selectedLanguage);

        // Speichere die ausgewählte Sprache im Cookie
        updateLanguageCookie(selectedLanguage);
    });
});
