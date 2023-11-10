// language-switcher.js
document.addEventListener('DOMContentLoaded', function () {
    const languageSlider = document.getElementById('language-slider');
    const translatableElements = document.querySelectorAll('.translatable');

    // Wenn es ein gespeichertes Sprach-Cookie gibt, stelle den Schieberegler entsprechend ein
    if (savedLanguage === 'en') {
        languageSlider.checked = true;
    }

    // Funktion zum Laden von Texten aus der Datei
    async function loadTexts(language) {
        try {
            const response = await fetch(`../language/language-${language}.txt`);
            const texts = await response.text();

            texts.split('\n').forEach(function (text) {
                const [key, value] = text.split('=');
                if (key && value) {
                    const element = document.getElementById(key);
                    if (element && element.classList.contains('translatable')) {
                        element.textContent = value;
                    }
                }
            });
        } catch (error) {
            console.error('Fehler beim Laden der Texte:', error);
        }
    }

    function updateLanguageCookie(language) {
        setCookie('language', language, 4); // Speichere die Sprache für 4 Tage
    }

    function setSliderState(language) {
        languageSlider.checked = language === 'en';
    }

    // Überwache Änderungen am Schieberegler und speichere die Sprache als Cookie
    languageSlider.addEventListener('change', function () {
        const selectedLanguage = languageSlider.checked ? 'de' : 'en';

        // Aktualisiere den Text der translatable-Elemente basierend auf der ausgewählten Sprache
        loadTexts(selectedLanguage);

        // Speichere die ausgewählte Sprache im Cookie
        updateLanguageCookie(selectedLanguage);
    });

    // Initialisiere den Text basierend auf dem gespeicherten Cookie
    const savedLanguage = getCookie('language') || 'de';
    setSliderState(savedLanguage);
    loadTexts(savedLanguage);
});
